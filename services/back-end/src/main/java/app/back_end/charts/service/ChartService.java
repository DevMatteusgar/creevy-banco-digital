package app.back_end.charts.service;

import app.back_end.charts.dto.CandleDto;
import app.back_end.charts.dto.ChartDataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;
import app.back_end.charts.service.IndicatorService;

import java.math.BigDecimal;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ChartService {

    @Autowired
    private IndicatorService indicatorService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    // Cache com expiração
    private final Map<String, CacheEntry> cache = new ConcurrentHashMap<>();
    private final long CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutos de cache

    // Your Alpha Vantage API key
    private final String apiKey = "SUA_API_KEY_ALPHA_VANTAGE";

    public ChartDataResponse getChartInfo(String symbol) {
        long now = System.currentTimeMillis();
        if (cache.containsKey(symbol)) {
            CacheEntry entry = cache.get(symbol);
            if (now - entry.timestamp < CACHE_DURATION_MS) {
                return entry.data;
            }
        }

        try {
            // Faz requisição para Alpha Vantage
            URI uri = UriComponentsBuilder.fromUriString("https://www.alphavantage.co/query")
                    .queryParam("function", "TIME_SERIES_DAILY")
                    .queryParam("symbol", symbol)
                    .queryParam("apikey", apiKey)
                    .queryParam("outputsize", "compact") // ou "full" se quiser histórico completo
                    .build().toUri();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(uri)
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() != 200) {
                throw new RuntimeException("Erro Alpha Vantage, status: " + response.statusCode());
            }

            JsonNode json = objectMapper.readTree(response.body());

            // O nó com os dados de tempo
            JsonNode timeSeries = json.get("Time Series (Daily)");
            if (timeSeries == null) {
                throw new RuntimeException("Resposta Alpha Vantage inválida para símbolo " + symbol + ": " + response.body());
            }

            // Parse das candles
            List<CandleDto> candles = new ArrayList<>();
            for (Iterator<String> it = timeSeries.fieldNames(); it.hasNext(); ) {
                String dateStr = it.next();
                JsonNode dayData = timeSeries.get(dateStr);

                CandleDto c = new CandleDto();
                LocalDate dt = LocalDate.parse(dateStr);
                LocalDateTime ldt = dt.atStartOfDay();
                c.setTime(ldt);

                c.setOpen(new BigDecimal(dayData.get("1. open").asText()));
                c.setHigh(new BigDecimal(dayData.get("2. high").asText()));
                c.setLow(new BigDecimal(dayData.get("3. low").asText()));
                c.setClose(new BigDecimal(dayData.get("4. close").asText()));
                c.setVolume(dayData.get("5. volume").asLong());

                candles.add(c);
            }

            // Ordena por data crescente
            candles.sort(Comparator.comparing(CandleDto::getTime));

            // Preenche a resposta
            ChartDataResponse res = new ChartDataResponse();
            res.setSymbol(symbol);
            // Último preço é o close da última candle
            if (!candles.isEmpty()) {
                CandleDto last = candles.get(candles.size() - 1);
                res.setPrice(last.getClose());
            }
            res.setCandles(candles);
            res.setLastUpdate(LocalDateTime.now());

            // Calcula indicadores
            List<Double> closes = candles.stream()
                    .map(c -> c.getClose().doubleValue())
                    .collect(Collectors.toList());

            Map<String, List<Double>> indicators = new HashMap<>();
            indicators.put("SMA_20", indicatorService.sma(closes, 20));
            indicators.put("EMA_20", indicatorService.ema(closes, 20));
            indicators.put("RSI_14", indicatorService.rsi(closes, 14));
            indicators.put("MACD_12_26", indicatorService.macd(closes, 12, 26));
            res.setIndicators(indicators);

            // Salva no cache
            cache.put(symbol, new CacheEntry(res, now));

            return res;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar dados Alpha Vantage para " + symbol + ": " + e.getMessage(), e);
        }
    }

    @Scheduled(fixedRate = 30_000)
    public void publishRealtimeUpdates() {
        List<String> symbols = List.of("AAPL", "MSFT", "GOOG");
        for (String symbol : symbols) {
            try {
                ChartDataResponse data = getChartInfo(symbol);
                if (data.getCandles() != null && !data.getCandles().isEmpty()) {
                    CandleDto last = data.getCandles().get(data.getCandles().size() - 1);
                    Map<String, Object> payload = new HashMap<>();
                    payload.put("symbol", symbol);
                    payload.put("candle", last);
                    payload.put("indicators", data.getIndicators());
                    messagingTemplate.convertAndSend("/topic/chart/" + symbol, payload);
                }
            } catch (Exception e) {
                System.err.println("Erro ao publicar realtime AV " + symbol + ": " + e.getMessage());
            }
        }
    }

    private static class CacheEntry {
        ChartDataResponse data;
        long timestamp;

        CacheEntry(ChartDataResponse data, long timestamp) {
            this.data = data;
            this.timestamp = timestamp;
        }
    }
}
