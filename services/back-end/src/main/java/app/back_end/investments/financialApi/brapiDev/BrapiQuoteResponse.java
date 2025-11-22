package app.back_end.investments.financialApi.brapiDev;

import java.util.List;

public class BrapiQuoteResponse {

    private List<BrapiQuoteResult> results;

    public List<BrapiQuoteResult> getResults() {
        return results;
    }

    public void setResults(List<BrapiQuoteResult> results) {
        this.results = results;
    }

    public static class BrapiQuoteResult {

        private String symbol;
        private String shortName;
        private Double regularMarketPrice;

        // Campos adicionais:
        private String currency;
        private Double marketCap;
        private String logoUrl;

        // getters e setters
        public String getSymbol() { return symbol; }
        public void setSymbol(String symbol) { this.symbol = symbol; }

        public String getShortName() { return shortName; }
        public void setShortName(String shortName) { this.shortName = shortName; }

        public Double getRegularMarketPrice() { return regularMarketPrice; }
        public void setRegularMarketPrice(Double regularMarketPrice) { this.regularMarketPrice = regularMarketPrice; }

        public String getCurrency() { return currency; }
        public void setCurrency(String currency) { this.currency = currency; }

        public Double getMarketCap() { return marketCap; }
        public void setMarketCap(Double marketCap) { this.marketCap = marketCap; }

        public String getLogoUrl() { return logoUrl; }
        public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
    }

}
