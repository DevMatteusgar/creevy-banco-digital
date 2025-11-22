package app.back_end.charts.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class IndicatorService {

    // SMA: returns same length list with nulls for initial positions
    public List<Double> sma(List<Double> values, int period) {
        List<Double> res = new ArrayList<>();
        double sum = 0.0;
        for (int i = 0; i < values.size(); i++) {
            Double v = values.get(i);
            if (v == null) v = 0.0;
            sum += v;
            if (i >= period) sum -= values.get(i - period);
            if (i >= period - 1) res.add(sum / period);
            else res.add(null);
        }
        return res;
    }

    // EMA
    public List<Double> ema(List<Double> values, int period) {
        List<Double> res = new ArrayList<>();
        double k = 2.0 / (period + 1);
        Double prev = null;
        for (int i = 0; i < values.size(); i++) {
            Double v = values.get(i);
            if (v == null) v = 0.0;
            if (prev == null) {
                prev = v; // seed with first value
            } else {
                prev = v * k + prev * (1 - k);
            }
            res.add(prev);
        }
        return res;
    }

    // RSI (simple implementation)
    public List<Double> rsi(List<Double> values, int period) {
        List<Double> res = new ArrayList<>();
        if (values.size() == 0) return res;
        List<Double> gains = new ArrayList<>();
        List<Double> losses = new ArrayList<>();
        gains.add(0.0);
        losses.add(0.0);
        for (int i = 1; i < values.size(); i++) {
            double diff = values.get(i) - values.get(i - 1);
            gains.add(Math.max(0, diff));
            losses.add(Math.max(0, -diff));
        }
        for (int i = 0; i < values.size(); i++) {
            if (i < period) {
                res.add(null);
                continue;
            }
            double avgGain = 0, avgLoss = 0;
            for (int j = i - period + 1; j <= i; j++) {
                avgGain += gains.get(j);
                avgLoss += losses.get(j);
            }
            avgGain /= period;
            avgLoss /= period;
            double rs = avgLoss == 0 ? 0 : avgGain / avgLoss;
            double rsi = avgLoss == 0 ? 100 : 100 - (100 / (1 + rs));
            res.add(rsi);
        }
        return res;
    }

    // (Optional) MACD: fastEMA - slowEMA; returns histogram as well
    public List<Double> macd(List<Double> values, int fastPeriod, int slowPeriod) {
        List<Double> fast = ema(values, fastPeriod);
        List<Double> slow = ema(values, slowPeriod);
        List<Double> macd = new ArrayList<>();
        for (int i = 0; i < values.size(); i++) {
            Double f = fast.get(i);
            Double s = slow.get(i);
            if (f == null || s == null) macd.add(null);
            else macd.add(f - s);
        }
        return macd;
    }
}
