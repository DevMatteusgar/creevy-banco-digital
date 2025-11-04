package app.back_end.auth.dto.response;

import java.time.LocalDateTime;

public class RegisterDtoResponse {

    private Long id;
    private String name;
    private String cpf;
    private String email;
    private LocalDateTime createdAt;

    public RegisterDtoResponse(Long id,
                               String name,
                               String cpf,
                               String email,
                               LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getEmail() {
        return email;
    }
    public String getCpf() {
        return cpf;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
