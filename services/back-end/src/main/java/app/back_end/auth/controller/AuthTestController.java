package app.back_end.auth.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/testauth") // Teste de validação do token jwt
public class AuthTestController {

    @GetMapping("test")
    public String test(){
        return "Você possui um token jwt";
    }
}
