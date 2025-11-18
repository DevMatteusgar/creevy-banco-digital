package app.back_end.investments.service;

import app.back_end.auth.exceptions.UserNotFoundException;
import app.back_end.auth.model.UserModel;
import app.back_end.auth.repository.UserRepository;
import app.back_end.investments.dto.response.StockMarketInfoDto;
import app.back_end.investments.dto.response.StocksSummaryDto;
import app.back_end.investments.dto.response.StocksTransferDtoResponse;
import app.back_end.investments.exceptions.InsuficientInvestmentsFundsException;
import app.back_end.investments.financialApi.brapiDev.BrapiQuoteResponse;
import app.back_end.investments.financialApi.brapiDev.BrapiService;
import app.back_end.investments.model.StocksModel;
import app.back_end.investments.repository.StocksRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class StocksService {

    @Autowired
    private StocksRepository stocksRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StocksTransferService stocksTransferService;

    @Autowired
    private BrapiService brapiService;

    @Transactional
    public StocksTransferDtoResponse createStockBuy(
            String email,
            Integer stockQuantity,
            String stockIdentifier
    ) {

        validateInputs(stockIdentifier, stockQuantity);

        // Busca usuário
        UserModel user = getUser(email);

        // Consulta BRAPI (nome + preço real)
        BrapiQuoteResponse.BrapiQuoteResult quote = getQuoteOrFail(stockIdentifier);
        Double stockPrice = quote.getRegularMarketPrice();
        String stockName = quote.getShortName();

        Double transactionTotalPrice = stockQuantity * stockPrice;

        validateBalance(user, transactionTotalPrice);

        Long userId = user.getId();

        // Se já existe ação, apenas atualiza usando valor da API
        var existingStock = stocksRepository
                .findByStockIdentifierAndUserId(stockIdentifier, userId);

        if (existingStock.isPresent()) {
            return updateExistingStock(user, existingStock.get(), stockQuantity, stockPrice);
        }

        // Criar nova ação
        Double finalBalance = user.getInvestmentsBalance() - transactionTotalPrice;
        user.setInvestmentsBalance(finalBalance);
        userRepository.save(user);

        StocksModel stock = new StocksModel(
                user,
                stockName,
                stockIdentifier,
                stockQuantity,
                stockPrice
        );

        stocksRepository.save(stock);

        return stocksTransferService.createInvestmentTransaction(
                stock,
                stockQuantity,
                stockPrice,
                transactionTotalPrice,
                finalBalance,
                "StockCall"
        );
    }

    @Transactional
    public StocksTransferDtoResponse updateStockQuantityByApi(
            String email,
            String stockIdentifier,
            Integer stockQuantity
    ) {

        validateInputs(stockIdentifier, stockQuantity);

        UserModel user = getUser(email);
        Long userId = user.getId();

        StocksModel stock = stocksRepository
                .findByStockIdentifierAndUserId(stockIdentifier, userId)
                .orElseThrow(() -> new IllegalArgumentException("Ação não encontrada para o usuário."));

        // Preço atualizado via BRAPI api
        BrapiQuoteResponse.BrapiQuoteResult quote = getQuoteOrFail(stockIdentifier);
        Double stockPrice = quote.getRegularMarketPrice();

        return updateExistingStock(user, stock, stockQuantity, stockPrice);
    }

    @Transactional
    public StocksTransferDtoResponse createStockSell(
            String email,
            Integer stockQuantity,
            String stockIdentifier
    ) {

        validateInputs(stockIdentifier, stockQuantity);

        // Buscar usuário
        UserModel user = getUser(email);
        Long userId = user.getId();

        // Validar se a ação existe na carteira
        StocksModel stock = stocksRepository
                .findByStockIdentifierAndUserId(stockIdentifier, userId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Você não possui essa ação para vender.")
                );

        // Se não tem quantidade suficiente
        if (stock.getStockQuantity() < stockQuantity) {
            throw new IllegalArgumentException("Quantidade insuficiente para venda.");
        }

        // Consulta BRAPI
        BrapiQuoteResponse.BrapiQuoteResult quote = getQuoteOrFail(stockIdentifier);
        Double stockPrice = quote.getRegularMarketPrice();
        String stockName = quote.getShortName();

        Double transactionTotalPrice = stockQuantity * stockPrice;

        // Atualiza saldo: VENDA → adiciona ao saldo
        Double finalBalance = user.getInvestmentsBalance() + transactionTotalPrice;
        user.setInvestmentsBalance(finalBalance);
        userRepository.save(user);

        // Atualiza a ação
        int remainingQty = stock.getStockQuantity() - stockQuantity;

        if (remainingQty == 0) {
            // Se zerou a quantidade, remove
            stocksRepository.delete(stock);
        } else {
            // Senão, atualiza quantidade + preço médio
            stock.setStockQuantity(remainingQty);
            stock.setStockPrice(stockPrice); // preço mais atual
            stocksRepository.save(stock);
        }

        // Registrar transação
        return stocksTransferService.createInvestmentTransaction(
                stock,
                stockQuantity,
                stockPrice,
                transactionTotalPrice,
                finalBalance,
                "StockSell"
        );
    }

    private void validateInputs(String stockIdentifier, Integer stockQuantity) {
        if (stockIdentifier == null || stockIdentifier.isBlank()) {
            throw new IllegalArgumentException("Identificador da ação inválido");
        }
        if (stockQuantity == null || stockQuantity <= 0) {
            throw new IllegalArgumentException("Quantidade inválida");
        }
    }

    private UserModel getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
    }

    private void validateBalance(UserModel user, Double amount) {
        if (user.getInvestmentsBalance() == null ||
                user.getInvestmentsBalance() < amount) {
            throw new InsuficientInvestmentsFundsException("Saldo insuficiente.");
        }
    }

    private BrapiQuoteResponse.BrapiQuoteResult getQuoteOrFail(String stockIdentifier) {
        BrapiQuoteResponse.BrapiQuoteResult quote = brapiService.getQuote(stockIdentifier);
        if (quote.getRegularMarketPrice() == null || quote.getRegularMarketPrice() <= 0) {
            throw new IllegalArgumentException("BRAPI retornou preço inválido para: " + stockIdentifier);
        }
        return quote;
    }

    private StocksTransferDtoResponse updateExistingStock(
            UserModel user,
            StocksModel stock,
            Integer stockQuantity,
            Double stockPrice
    ) {

        Double transactionTotalPrice = stockQuantity * stockPrice;

        validateBalance(user, transactionTotalPrice);

        Double finalBalance = user.getInvestmentsBalance() - transactionTotalPrice;

        user.setInvestmentsBalance(finalBalance);
        userRepository.save(user);

        stock.setStockQuantity(stock.getStockQuantity() + stockQuantity);
        stock.setStockPrice(stockPrice);
        stocksRepository.save(stock);

        return stocksTransferService.createInvestmentTransaction(
                stock,
                stockQuantity,
                stockPrice,
                transactionTotalPrice,
                finalBalance,
                "StockCall"
        );
    }

    public Double getOneStockTotalValue(String email, String stockIdentifier) {

        if (stockIdentifier == null || stockIdentifier.isBlank()) {
            throw new IllegalArgumentException("Identificador inválido.");
        }

        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado."));

        StocksModel stock = stocksRepository
                .findByStockIdentifierAndUserId(stockIdentifier, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Ação não encontrada para este usuário."));

        return stock.getStockTotalValue();
    }

    public List<StocksSummaryDto> getAllUserStocks(String email) {

        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        List<StocksModel> stocks = stocksRepository.findAllByUserId(user.getId());

        return stocks.stream()
                .map(stock -> new StocksSummaryDto(
                        stock.getStockIdentifier(),
                        stock.getStockName(),
                        stock.getStockQuantity(),
                        stock.getStockPrice(),
                        stock.getStockTotalValue()
                ))
                .toList();
    }

    public List<StockMarketInfoDto> getFeaturedStocks() {

        String[] identifiers = {"PETR4", "MGLU3", "VALE3", "ITUB4"};

        return Arrays.stream(identifiers)
                .map(this::getStockMarketInfo)
                .toList();
    }

    public StockMarketInfoDto getStockMarketInfo(String identifier) {
        var quote = brapiService.getQuote(identifier);

        if (quote == null || quote.getRegularMarketPrice() == null) {
            throw new IllegalArgumentException("Não foi possível obter dados da ação: " + identifier);
        }

        return new StockMarketInfoDto(
                identifier,
                quote.getShortName(),
                quote.getRegularMarketPrice(),
                quote.getCurrency(),
                quote.getMarketCap(),
                quote.getLogoUrl()
        );
    }

    public List<StockMarketInfoDto> getAllFixedStocksMarketInfo() {

        List<String> identifiers = List.of("PETR4", "MGLU3", "VALE3", "ITUB4");
        List<StockMarketInfoDto> response = new ArrayList<>();

        for (String id : identifiers) {

            var quote = brapiService.getQuote(id);

            if (quote == null || quote.getRegularMarketPrice() == null) {
                throw new IllegalArgumentException("Não foi possível obter dados da ação: " + id);
            }

            response.add(
                    new StockMarketInfoDto(
                            id,
                            quote.getShortName(),
                            quote.getRegularMarketPrice(),
                            quote.getCurrency(),
                            quote.getMarketCap(),
                            quote.getLogoUrl()
                    )
            );
        }

        return response;
    }
}
