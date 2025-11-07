package app.back_end.transfer.controller;

import app.back_end.transfer.dto.request.DepositDtoRequest;
import app.back_end.transfer.dto.request.TransferDtoRequest;
import app.back_end.transfer.dto.response.DepositDtoResponse;
import app.back_end.transfer.dto.response.TransferDtoResponse;
import app.back_end.transfer.model.TransferModel;
import app.back_end.transfer.service.TransferService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/balance")
public class TransferController {

    @Autowired
    private TransferService transferService;

    @PostMapping("deposit")
    public ResponseEntity<DepositDtoResponse> deposit(
            HttpServletRequest request, //Vem pelo header possibilitando saber o usuário ativo
            @RequestBody DepositDtoRequest depositForm
            ){
        String email = (String) request.getAttribute("userId");
        DepositDtoResponse response = transferService.deposit(email, depositForm.getDepositValue());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("transfer")
    public ResponseEntity<TransferDtoResponse> transfer(
            @RequestBody TransferDtoRequest transferForm,
            HttpServletRequest request
    ){
        String email = (String) request.getAttribute("userId");
        TransferDtoResponse response = transferService.transfer(transferForm.getAccountId(), transferForm.getTransferValue(), email);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("listAllTransfers")
    public ResponseEntity<List<TransferModel>> listAllTransactions() {
        List<TransferModel> response = transferService.listAllTransactions();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
