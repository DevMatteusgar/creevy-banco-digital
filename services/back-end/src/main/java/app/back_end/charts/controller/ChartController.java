package app.back_end.charts.controller;

import app.back_end.charts.dto.ChartDataResponse;
import app.back_end.charts.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chart")
public class ChartController {

    @Autowired
    private ChartService chartService;

    // Retorna informações gerais do gráfico (preço, candles, indicadores)
    @GetMapping("/info/{symbol}")
    public ResponseEntity<ChartDataResponse> getChartInfo(@PathVariable String symbol) {
        try {
            ChartDataResponse response = chartService.getChartInfo(symbol);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    // Retorna apenas os indicadores calculados para o ativo
    @GetMapping("/indicators/{symbol}")
    public ResponseEntity<?> getIndicators(@PathVariable String symbol) {
        try {
            ChartDataResponse info = chartService.getChartInfo(symbol);
            return ResponseEntity.ok(info.getIndicators());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    // Endpoint de histórico simplificado (os candles já vêm no getChartInfo)
    @GetMapping("/history/{symbol}")
    public ResponseEntity<?> getHistory(@PathVariable String symbol) {
        try {
            ChartDataResponse info = chartService.getChartInfo(symbol);
            return ResponseEntity.ok(info.getCandles());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
}
