package app.back_end.charts.util;

import java.util.*;

public class IndicatorUtils {

    public static List<Double> sma(List<Double> prices, int period) {
        List<Double> result = new ArrayList<>();
        for (int i = 0; i < prices.size(); i++) {
            if (i < period) result.add(null);
            else {
                double sum = 0;
                for (int j = i - period; j < i; j++) {
                    sum += prices.get(j);
                }
                result.add(sum / period);
            }
        }
        return result;
    }

    public static List<Double> ema(List<Double> prices, int period) {
        List<Double> result = new ArrayList<>();
        double multiplier = 2.0 / (period + 1);

        Double emaPrev = prices.get(0);
        result.add(emaPrev);

        for (int i = 1; i < prices.size(); i++) {
            double ema = (prices.get(i) - emaPrev) * multiplier + emaPrev;
            result.add(ema);
            emaPrev = ema;
        }

        return result;
    }

    public static List<Double> rsi(List<Double> prices, int period) {
        List<Double> result = new ArrayList<>();

        double gain = 0, loss = 0;

        for (int i = 1; i <= period; i++) {
            double diff = prices.get(i) - prices.get(i - 1);
            if (diff >= 0) gain += diff;
            else loss -= diff;
        }

        gain /= period;
        loss /= period;

        double rs = gain / loss;
        result.add(100 - (100 / (1 + rs)));

        for (int i = period + 1; i < prices.size(); i++) {
            double diff = prices.get(i) - prices.get(i - 1);
            if (diff >= 0) {
                gain = (gain * (period - 1) + diff) / period;
                loss = (loss * (period - 1)) / period;
            } else {
                gain = (gain * (period - 1)) / period;
                loss = (loss * (period - 1) - diff) / period;
            }

            rs = gain / loss;
            result.add(100 - (100 / (1 + rs)));
        }

        return result;
    }
}
