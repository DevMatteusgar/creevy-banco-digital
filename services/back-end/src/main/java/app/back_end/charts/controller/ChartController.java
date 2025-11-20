package app.back_end.charts.controller;

import app.back_end.charts.dto.ChartDataResponse;
import app.back_end.charts.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/chart")
@CrossOrigin("*")
public class ChartController {

    @Autowired
    private ChartService chartService;

    @GetMapping("/info/{symbol}")
    public ResponseEntity<ChartDataResponse> getChartInfo(@PathVariable String symbol) {
        ChartDataResponse response = chartService.getChartInfo(symbol);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/history/{symbol}")
    public ResponseEntity<?> getHistory(@PathVariable String symbol, @RequestParam(defaultValue = "6") int months) {
        // months param supported, but ChartService.fetchHistorical expects int monthsBack; here we ignore for brevity
        try {
            var list = chartService.fetchHistorical(symbol, months);
            return ResponseEntity.status(HttpStatus.OK).body(list);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/indicators/{symbol}")
    public ResponseEntity<?> getIndicators(@PathVariable String symbol) {
        ChartDataResponse info = chartService.getChartInfo(symbol);
        return ResponseEntity.status(HttpStatus.OK).body(info.getIndicators());
    }
}
