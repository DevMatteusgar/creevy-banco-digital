package app.back_end.user.controller;

import app.back_end.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import app.back_end.transfer.dto.response.UserBalanceDtoResponse;
import app.back_end.user.service.UserBalanceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

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
}
