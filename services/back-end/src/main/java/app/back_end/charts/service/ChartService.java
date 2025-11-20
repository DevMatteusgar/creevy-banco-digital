package app.back_end.charts.service;

import app.back_end.charts.dto.CandleDto;
import app.back_end.charts.dto.ChartDataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import app.back_end.charts.service.IndicatorService;

import java.math.BigDecimal;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ChartService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final Map<String, CacheEntry> cache = new ConcurrentHashMap<>();
    private final long CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutos

    private final String polygonApiKey = "rrQTEGlmfcAvPhpKn9stVf8vypS4R3yd";

    public ChartDataResponse getChartInfo(String symbol) {
        long now = System.currentTimeMillis();
        if (cache.containsKey(symbol)) {
            CacheEntry entry = cache.get(symbol);
            if (now - entry.timestamp < CACHE_DURATION_MS) {
                return entry.data;
            }
        }

        try {
            URI uri = UriComponentsBuilder.fromUriString(
                            "https://api.polygon.io/v2/aggs/ticker/" + symbol + "/range/1/day/2023-01-01/2025-12-31")
                    .queryParam("adjusted", "true")
                    .queryParam("sort", "asc")
                    .queryParam("apiKey", polygonApiKey)
                    .build().toUri();

            HttpRequest request = HttpRequest.newBuilder().uri(uri).GET().build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                throw new RuntimeException("Erro Polygon.io: " + response.statusCode());
            }

            JsonNode json = objectMapper.readTree(response.body());
            JsonNode results = json.get("results");
            if (results == null || !results.isArray()) {
                throw new RuntimeException("Resposta inválida Polygon.io: " + response.body());
            }

            List<CandleDto> candles = new ArrayList<>();
            for (JsonNode node : results) {
                CandleDto c = new CandleDto();
                long timestamp = node.get("t").asLong();
                c.setTime(LocalDateTime.ofInstant(Instant.ofEpochMilli(timestamp), ZoneId.systemDefault()));
                c.setOpen(BigDecimal.valueOf(node.get("o").asDouble()));
                c.setHigh(BigDecimal.valueOf(node.get("h").asDouble()));
                c.setLow(BigDecimal.valueOf(node.get("l").asDouble()));
                c.setClose(BigDecimal.valueOf(node.get("c").asDouble()));
                c.setVolume(node.get("v").asLong());
                candles.add(c);
            }

            ChartDataResponse res = new ChartDataResponse();
            res.setSymbol(symbol);
            if (!candles.isEmpty()) {
                res.setPrice(candles.get(candles.size() - 1).getClose());
            }
            res.setCandles(candles);
            res.setLastUpdate(LocalDateTime.now());

            cache.put(symbol, new CacheEntry(res, now));

            return res;

        } catch (Exception e) {
            System.err.println("[ChartService] Erro ao buscar dados Polygon.io para " + symbol + ": " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Scheduled(fixedRate = 30_000)
    public void publishRealtimeUpdates() {
        List<String> symbols = List.of("AAPL", "MSFT", "GOOG");
        for (String symbol : symbols) {
            try {
                ChartDataResponse data = getChartInfo(symbol);
                if (data.getCandles() != null && !data.getCandles().isEmpty()) {
                    Map<String, Object> payload = new HashMap<>();
                    payload.put("symbol", symbol);
                    payload.put("candles", data.getCandles());

                    // Envia pelo WebSocket
                    messagingTemplate.convertAndSend("/topic/chart/" + symbol, payload);

                }
            } catch (Exception e) {
                System.err.println("[ChartService] Erro ao publicar realtime Polygon.io " + symbol + ": " + e.getMessage());
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
