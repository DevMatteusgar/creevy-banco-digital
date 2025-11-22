package app.back_end.investments.controller;

import app.back_end.investments.dto.request.StocksBuyDtoRequest;
import app.back_end.investments.dto.request.StocksSellDtoRequest;
import app.back_end.investments.dto.request.StocksUpdateDtoRequest;
import app.back_end.investments.dto.response.StockMarketInfoDto;
import app.back_end.investments.dto.response.StocksSummaryDto;
import app.back_end.investments.dto.response.StocksTransferDtoResponse;
import app.back_end.investments.service.StocksService;
import app.back_end.investments.service.StocksTransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.userdetails.User;

import java.util.List;

@RestController
@RequestMapping("/stocks")
public class StocksController {

    @Autowired
    private StocksService stocksService;

    @Autowired
    private StocksTransferService stocksTransferService;

    @PostMapping("/buy")
    public ResponseEntity<StocksTransferDtoResponse> buyStock(
            @AuthenticationPrincipal User user,
            @RequestBody StocksBuyDtoRequest request
    ) {
        String email = user.getUsername();

        StocksTransferDtoResponse response = stocksService.createStockBuy(
                email,
                request.getStockQuantity(),
                request.getStockIdentifier()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/sell")
    public ResponseEntity<StocksTransferDtoResponse> sellStock(
            @AuthenticationPrincipal User user,
            @RequestBody StocksSellDtoRequest request
    ) {
        String email = user.getUsername();

        StocksTransferDtoResponse response = stocksService.createStockSell(
                email,
                request.getStockQuantity(),
                request.getStockIdentifier()
        );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    @PostMapping("/add")
    public ResponseEntity<StocksTransferDtoResponse> addStockQuantity(
            @AuthenticationPrincipal User user,
            @RequestBody StocksUpdateDtoRequest request
    ) {
        String email = user.getUsername();

        StocksTransferDtoResponse response = stocksService.updateStockQuantityByApi(
                email,
                request.getStockIdentifier(),
                request.getStockQuantity()
        );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/listAllTransactions")
    public ResponseEntity<List<StocksTransferDtoResponse>> listAll(
            @AuthenticationPrincipal User user) {

        String email = user.getUsername();

        return ResponseEntity.ok(
                stocksTransferService.getAllTransactions(email)
        );
    }

    @GetMapping("/totalValue/{stockIdentifier}")
    public ResponseEntity<Double> getStockTotalValue(
            @AuthenticationPrincipal User user,
            @PathVariable String stockIdentifier
    ) {
        String email = user.getUsername(); // vem do token JWT
        Double totalValue = stocksService.getOneStockTotalValue(email, stockIdentifier);
        return ResponseEntity.ok(totalValue);
    }

    @GetMapping("/myStocks")
    public ResponseEntity<List<StocksSummaryDto>> getMyStocks(
            @AuthenticationPrincipal User user
    ) {
        String email = user.getUsername();
        List<StocksSummaryDto> response = stocksService.getAllUserStocks(email);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/featuredStocks")
    public ResponseEntity<List<StockMarketInfoDto>> getFeaturedStocks() {
        return ResponseEntity.ok(stocksService.getFeaturedStocks());
    }

    @GetMapping("/stockInfo/{identifier}")
    public ResponseEntity<StockMarketInfoDto> getStockInfo(
            @PathVariable String identifier
    ) {
        return ResponseEntity.ok(stocksService.getStockMarketInfo(identifier));
    }

    @GetMapping("/listAllStocksInfo")
    public ResponseEntity<List<StockMarketInfoDto>> getAllFixedStocks() {
        return ResponseEntity.ok(stocksService.getAllFixedStocksMarketInfo());
    }
}
