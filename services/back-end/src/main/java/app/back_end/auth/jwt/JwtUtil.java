package app.back_end.auth.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    // Chave secreta usada para assinar o token via .env
    @Value("${jwt.secret}")
    private String secret;

    // Gera token JWT com o username
    public String generateToken(String username){
        return Jwts.builder()
                .setSubject(username) // Define o "sub" do JWT como o username
                .setIssuedAt(new Date()) // Data de emissão
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // Expira em 1 hora
                .signWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8))) // Assinatura HMAC
                .compact();
    }
}
