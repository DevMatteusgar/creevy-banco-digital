package app.back_end.balance.controller;

import app.back_end.balance.dto.request.DepositDtoRequest;
import app.back_end.balance.dto.response.TransferDtoResponse;
import app.back_end.balance.service.BalanceService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/balance")
public class BalanceController {

    @Autowired
    private BalanceService balanceService;

    @PostMapping("deposit")
    public ResponseEntity<TransferDtoResponse> deposit(
            HttpServletRequest request,
            @RequestBody DepositDtoRequest depositForm
            ){
        String email = (String) request.getAttribute("userId");
        TransferDtoResponse response = balanceService.deposit(email, depositForm.getDepositValue());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("transfer")
    public ResponseEntity<TransferDtoResponse> transfer(
            @RequestBody TransferDtoRequest transferForm
    ){

    }
}
