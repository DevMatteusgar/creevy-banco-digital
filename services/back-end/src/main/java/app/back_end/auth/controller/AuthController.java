package app.back_end.auth.controller;

import app.back_end.auth.dto.request.LoginDtoRequest;
import app.back_end.auth.dto.request.RegisterDtoRequest;
import app.back_end.auth.dto.response.AuthDtoResponse;
import app.back_end.auth.dto.response.RegisterDtoResponse;
import app.back_end.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth") // Todas as rotas aqui começam com /auth
public class AuthController {

    @Autowired
    private AuthService authService; // Injeção do serviço de autenticação

    // Registro de usuário
    @PostMapping("register")
    public ResponseEntity<RegisterDtoResponse> register(@Valid @RequestBody RegisterDtoRequest data){
        // Chama o metodo register do service, que salva o usuário no banco
        RegisterDtoResponse createdUser = authService.register(data);
        // Retorna status 201 CREATED com os dados do usuário criado
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    // Login do usuário (retorna JWT)
    @PostMapping("login")
    public ResponseEntity<AuthDtoResponse> login(@Valid @RequestBody LoginDtoRequest data){
        // Chama o metodo login do service, que valida usuário e gera token JWT
        AuthDtoResponse tokenJwt = authService.login(data);
        // Retorna status 200 OK com o token JWT no corpo
        return ResponseEntity.status(HttpStatus.OK).body(tokenJwt);
    }
}
