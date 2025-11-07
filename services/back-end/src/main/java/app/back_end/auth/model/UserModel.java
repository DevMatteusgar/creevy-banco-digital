package app.back_end.auth.model;

import app.back_end.transfer.model.TransferModel;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private String email;

    @Column(unique = true)
    private String cpf;

    //Data de criação
    @Column(name = "creation_date", updatable = false)
    private LocalDateTime creationDate;

    //Balance do usuario = 0
    @Column(name = "total_balance")
    private Double totalBalance = 0.0;

    @Column(name = "savings_balance")
    private Double savingsBalance = 0.0;

    @Column(name = "investments_balance")
    private Double investmentsBalance = 0.0;

    //Referencias transações por usuário (1 para muitos)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Indica o lado "gerenciador" da relação
    private List<TransferModel> transactions = new ArrayList<>();

    //Pre persist
    @PrePersist
    protected void onCreate() {
        this.creationDate = LocalDateTime.now();
        if (savingsBalance == null) savingsBalance = 0.0;
        if (investmentsBalance == null) investmentsBalance = 0.0;
        totalBalance = savingsBalance + investmentsBalance;
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
    public Double getTotalBalance() {
        return totalBalance;
    }
    public Double getSavingsBalance() {
        return savingsBalance;
    }
    public Double getInvestmentsBalance() {
        return investmentsBalance;
    }
    public void setSavingsBalance(Double savingsBalance) {
        this.savingsBalance = savingsBalance;
    }
    public void setInvestmentsBalance(Double investmentsBalance) {
        this.investmentsBalance = investmentsBalance;
    }
    public List<TransferModel> getTransactions() {
        return transactions;
    }
    public void setTransactions(List<TransferModel> transactions) {
        this.transactions = transactions;
    }
}
