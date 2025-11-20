package app.back_end.charts.service;

import app.back_end.charts.dto.CandleDto;
import app.back_end.charts.dto.ChartDataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import yahoofinance.Stock;
import yahoofinance.YahooFinance;
import yahoofinance.histquotes.HistoricalQuote;
import yahoofinance.histquotes.Interval;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ChartService {

    @Autowired
    private IndicatorService indicatorService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private final Map<String, ChartDataResponse> cache = new HashMap<>();

    public ChartDataResponse getChartInfo(String symbol) {
        try {
            if (cache.containsKey(symbol)) return cache.get(symbol);

            Stock stock = YahooFinance.get(symbol);
            if (stock == null || stock.getQuote() == null) throw new RuntimeException("Ativo não encontrado: " + symbol);

            ChartDataResponse res = new ChartDataResponse();
            res.setSymbol(symbol);
            res.setPrice(stock.getQuote().getPrice());
            res.setOpen(stock.getQuote().getOpen());
            res.setHigh(stock.getQuote().getDayHigh());
            res.setLow(stock.getQuote().getDayLow());
            res.setPreviousClose(stock.getQuote().getPreviousClose());
            res.setVolume(stock.getQuote().getVolume() == null ? 0L : stock.getQuote().getVolume());
            res.setLastUpdate(LocalDateTime.now());

            List<CandleDto> candles = fetchHistorical(symbol, 6);
            res.setCandles(candles);

            List<Double> closes = candles.stream()
                    .map(c -> c.getClose() == null ? 0.0 : c.getClose().doubleValue())
                    .collect(Collectors.toList());

            Map<String, List<Double>> indicators = new HashMap<>();
            indicators.put("SMA_20", indicatorService.sma(closes, 20));
            indicators.put("EMA_20", indicatorService.ema(closes, 20));
            indicators.put("RSI_14", indicatorService.rsi(closes, 14));
            indicators.put("MACD_12_26", indicatorService.macd(closes, 12, 26));

            res.setIndicators(indicators);

            cache.put(symbol, res);
            return res;

        } catch (IOException e) {
            throw new RuntimeException("Erro YahooFinance: " + e.getMessage(), e);
        }
    }

    public List<CandleDto> fetchHistorical(String symbol, int monthsBack) throws IOException {
        Calendar from = Calendar.getInstance();
        from.add(Calendar.MONTH, -monthsBack);

        Stock stock = YahooFinance.get(symbol, from, Interval.DAILY);
        List<HistoricalQuote> history = stock.getHistory(from, Calendar.getInstance(), Interval.DAILY);

        List<CandleDto> candles = new ArrayList<>();
        for (HistoricalQuote q : history) {
            if (q.getDate() == null) continue;

            CandleDto c = new CandleDto();
            LocalDateTime ldt = q.getDate().toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate()
                    .atStartOfDay();

            c.setTime(ldt);
            c.setOpen(q.getOpen() != null ? q.getOpen() : BigDecimal.ZERO);
            c.setHigh(q.getHigh() != null ? q.getHigh() : BigDecimal.ZERO);
            c.setLow(q.getLow() != null ? q.getLow() : BigDecimal.ZERO);
            c.setClose(q.getClose() != null ? q.getClose() : BigDecimal.ZERO);
            c.setVolume(q.getVolume() != null ? q.getVolume() : 0L);

            candles.add(c);
        }

        Collections.reverse(candles); // ordem cronológica
        return candles;
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
                System.err.println("Erro ao publicar realtime " + symbol + ": " + e.getMessage());
            }
        }
    }
}
