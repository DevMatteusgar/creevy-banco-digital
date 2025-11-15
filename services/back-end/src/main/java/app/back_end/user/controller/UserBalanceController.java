package app.back_end.user.controller;

import app.back_end.transfer.model.TransferModel;
import app.back_end.transfer.service.TransferService;
import app.back_end.user.dto.request.SavingsToInvestmentsRequestDto;
import app.back_end.user.dto.request.TransferInvestmentsToSavingsDtoRequest;
import app.back_end.user.dto.response.InvestmentsToSavingsTransferDtoResponse;
import app.back_end.user.dto.response.SavingsToInvestmentsResponseDto;
import app.back_end.user.dto.response.UserBalanceHistoryDtoResponse;
import app.back_end.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import app.back_end.transfer.dto.response.UserBalanceDtoResponse;
import app.back_end.user.service.UserBalanceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.List;

@RestController
@RequestMapping("/balance")
public class UserBalanceController {

    @Autowired
    private UserBalanceService userBalanceService;

    @GetMapping("/myBalance")
    public ResponseEntity<UserBalanceDtoResponse> getBalance(@AuthenticationPrincipal User user) {
        String email = user.getUsername(); // vem direto do token JWT
        UserBalanceDtoResponse response = userBalanceService.getMyBalance(email);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/myBalanceHistory")
    public List<UserBalanceHistoryDtoResponse> getBalanceHistory(@AuthenticationPrincipal User user) {
        String email = user.getUsername(); // vem direto do token JWT
        return userBalanceService.getMyBalanceHistory(email);
    }

    @GetMapping("/myBalanceHistoryByTransfer")
    public List<UserBalanceHistoryDtoResponse> getBalanceHistoryByTransfer(@AuthenticationPrincipal User user) {
        String email = user.getUsername(); // vem do token JWT
        return userBalanceService.getMyBalanceHistoryByTransfer(email);
    }

    @PostMapping("/transferSavingsToInvestments")
    public ResponseEntity<TransferModel> transferSavingsToInvestments(
            @AuthenticationPrincipal User user,
            @RequestBody SavingsToInvestmentsRequestDto request
    ) {
        String email = user.getUsername();

        TransferModel transfer =
                userBalanceService.transferSavingsToInvestments(email, request.getAmount());

        return ResponseEntity.ok(transfer);
    }

    @PostMapping("/transferInvestmentsToSavings")
    public ResponseEntity<InvestmentsToSavingsTransferDtoResponse> transferToSavings(
            @AuthenticationPrincipal User user,
            @RequestBody TransferInvestmentsToSavingsDtoRequest request
    ) {
        String email = user.getUsername(); // vem do JWT

        InvestmentsToSavingsTransferDtoResponse response =
                userBalanceService.transferInvestmentsToSavings(email, request.getAmount());

        return ResponseEntity.ok(response);
    }
}
