package app.back_end.auth.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="users")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String password;

    @Column(unique = true)
    String email;

    @Column(unique = true)
    String cpf;

    //Referencias transações por usuário (1 para muitos)

    //Data de criação
    @Column(name = "creation_date", updatable = false)
    private LocalDateTime creationDate;
    //Callback para setar a data de criação automaticamente
    @PrePersist
    protected void onCreate() {
        this.creationDate = LocalDateTime.now();
    }

    //Getters and Setters
    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getCpf() {
        return cpf;
    }
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
    public LocalDateTime getCreationDate() {
        return creationDate;
    }
}
