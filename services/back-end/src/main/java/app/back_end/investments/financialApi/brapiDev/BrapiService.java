package app.back_end.investments.financialApi.brapiDev;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class BrapiService {

    private final RestTemplate restTemplate = new RestTemplate();

    public BrapiQuoteResponse.BrapiQuoteResult getQuote(String stockIdentifier) {

        String url = "https://brapi.dev/api/quote/" + stockIdentifier;

        BrapiQuoteResponse response =
                restTemplate.getForObject(url, BrapiQuoteResponse.class);

        if (response == null ||
                response.getResults() == null ||
                response.getResults().isEmpty()) {
            throw new RuntimeException("Ação não encontrada na BRAPI");
        }

        return response.getResults().get(0);
    }
}
