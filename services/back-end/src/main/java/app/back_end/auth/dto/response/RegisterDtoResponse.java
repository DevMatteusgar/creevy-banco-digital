package app.back_end.auth.dto.response;

public class RegisterDtoResponse {

    private Long id;
    private String name;
    private String cpf;
    private String email;
    private String password;
    private String createdAt;

    public RegisterDtoResponse(Long id,
                               String name,
                               String cpf,
                               String email,
                               String password,
                               String createdAt) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
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
    public String getPassword() {
        return password;
    }
    public String getCreatedAt() {
        return createdAt;
    }
}
