package app.back_end.user.controller;

import app.back_end.auth.model.UserModel;
import app.back_end.user.dto.response.AccountInfoDtoResponse;
import app.back_end.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("accountInfo/{id}")
    public ResponseEntity<AccountInfoDtoResponse> getAccountById(@PathVariable Long id) {
        AccountInfoDtoResponse response = userService.accountInfo(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("myInfo")
    public ResponseEntity<AccountInfoDtoResponse> myInfo(@AuthenticationPrincipal User user) {
        String email = user.getUsername(); // vem direto do token JWT
        AccountInfoDtoResponse response = userService.MyInfo(email);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("listAllUsers")
    public ResponseEntity<List<UserModel>> listAllUsers() {
        List<UserModel> response = userService.listAllUsers();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
