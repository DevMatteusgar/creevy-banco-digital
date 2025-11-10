package app.back_end.transfer.controller;

import app.back_end.transfer.dto.request.DepositDtoRequest;
import app.back_end.transfer.dto.request.TransferDtoRequest;
import app.back_end.transfer.dto.response.DepositDtoResponse;
import app.back_end.transfer.dto.response.TransferDtoResponse;
import app.back_end.transfer.model.TransferModel;
import app.back_end.transfer.service.TransferService;
import org.springframework.security.core.userdetails.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transfer")
public class TransferController {

    @Autowired
    private TransferService transferService;

    @PostMapping("deposit")
    public ResponseEntity<DepositDtoResponse> deposit(
            @AuthenticationPrincipal User user,
            @RequestBody DepositDtoRequest depositForm
    ) {
        String email = user.getUsername();
        DepositDtoResponse response = transferService.deposit(email, depositForm.getDepositValue());
        return ResponseEntity.ok(response);
    }

    @PostMapping("transferToUser")
    public ResponseEntity<TransferDtoResponse> transfer(
            @AuthenticationPrincipal User user,
            @RequestBody TransferDtoRequest transferForm
    ) {
        String email = user.getUsername();
        TransferDtoResponse response = transferService.transfer(
                transferForm.getAccountId(),
                transferForm.getTransferValue(),
                email
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("listAllTransfers")
    public ResponseEntity<List<TransferModel>> listAllTransactions() {
        List<TransferModel> response = transferService.listAllTransactions();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("ListAllUserTransfers/{userId}")
    public ResponseEntity<List<TransferModel>> listTransfersByUserId(@PathVariable Long userId) {
        List<TransferModel> response = transferService.findTransfersByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("ListMyTransfers")
    public ResponseEntity<List<TransferModel>> listMyTransfers(@AuthenticationPrincipal User user) {
        String email = user.getUsername(); // obtém o e-mail do token JWT
        List<TransferModel> response = transferService.findTransfersByUserEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
