package app.back_end.transfer.model;

import app.back_end.auth.model.UserModel;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class TransferModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference // Evita recursão infinita com UserModel
    private UserModel user;

    @Column(name = "sender_id")
    private Long senderId;

    @Column(name = "receiver_id")
    private Long receiverId;

    @Column(name = "sender_cpf")
    private String senderCpf;

    @Column(name = "receiver_cpf")
    private String receiverCpf;

    @Column(name = "sender_name")
    private String senderName;

    @Column(name = "receiver_name")
    private String receiverName;

    @Column(name = "operation_type")
    private String operationType; // Ex: TransferSend, TransferReceive

    @Column(name = "transaction_value")
    private Double amount;

    @Column(name = "balance_after_operation")
    private Double balanceAfterOperation;

    private String description;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "America/Sao_Paulo")
    private LocalDateTime date;

    //Construtor vazio exigido pelo JPA
    public TransferModel() {}

    //Construtor completo (caso precise montar tudo manualmente)
    public TransferModel(UserModel user, String operationType, Double amount,
                         Double balanceAfterOperation, String description,
                         Long senderId, Long receiverId,
                         String senderCpf, String receiverCpf,
                         String senderName, String receiverName) {

        this.user = user;
        this.operationType = operationType;
        this.amount = amount;
        this.balanceAfterOperation = balanceAfterOperation;
        this.description = description;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.senderCpf = senderCpf;
        this.receiverCpf = receiverCpf;
        this.senderName = senderName;
        this.receiverName = receiverName;
        this.date = LocalDateTime.now();
    }

    //Construtor simplificado (envio)
    public TransferModel(UserModel sender, UserModel receiver,
                         Double amount, Double balanceAfterOperation) {
        this.user = sender;
        this.senderId = sender.getId();
        this.receiverId = receiver.getId();
        this.senderCpf = sender.getCpf();
        this.receiverCpf = receiver.getCpf();
        this.senderName = sender.getName();
        this.receiverName = receiver.getName();
        this.operationType = "TransferSend";
        this.amount = amount;
        this.balanceAfterOperation = balanceAfterOperation;
        this.description = "Transferência enviada para " + receiver.getName();
        this.date = LocalDateTime.now();
    }

    //Construtor simplificado (recebimento)
    public static TransferModel createReceiverTransaction(UserModel receiver, UserModel sender,
                                                          Double amount, Double balanceAfterOperation) {
        TransferModel transaction = new TransferModel();
        transaction.user = receiver;
        transaction.senderId = sender.getId();
        transaction.receiverId = receiver.getId();
        transaction.senderCpf = sender.getCpf();
        transaction.receiverCpf = receiver.getCpf();
        transaction.senderName = sender.getName();
        transaction.receiverName = receiver.getName();
        transaction.operationType = "TransferReceive";
        transaction.amount = amount;
        transaction.balanceAfterOperation = balanceAfterOperation;
        transaction.description = "Transferência recebida de " + sender.getName();
        transaction.date = LocalDateTime.now();
        return transaction;
    }

    //Construtor de depósito
    public static TransferModel createDepositTransaction(UserModel receiver, Double amount, Double balanceAfterOperation) {
        TransferModel transaction = new TransferModel();
        transaction.user = receiver;
        transaction.setReceiverId(receiver.getId());
        transaction.setReceiverCpf(receiver.getCpf());
        transaction.setReceiverName(receiver.getName());
        transaction.setSenderName(receiver.getName());//
        transaction.setOperationType("Deposit");
        transaction.setAmount(amount);
        transaction.setBalanceAfterOperation(balanceAfterOperation);
        transaction.setDescription("Depósito efetuado por " + receiver.getName());
        transaction.setDate(LocalDateTime.now());
        return transaction;
    }

    //Getters e Setters (mantidos)
    public Long getId() { return id; }
    public UserModel getUser() { return user; }
    public String getOperationType() { return operationType; }
    public Double getBalanceAfterOperation() { return balanceAfterOperation; }
    public String getDescription() { return description; }
    public LocalDateTime getDate() { return date; }
    public Long getSenderId() { return senderId; }
    public void setSenderId(Long senderId) { this.senderId = senderId; }
    public Long getReceiverId() { return receiverId; }
    public void setReceiverId(Long receiverId) { this.receiverId = receiverId; }
    public String getSenderCpf() { return senderCpf; }
    public void setSenderCpf(String senderCpf) { this.senderCpf = senderCpf; }
    public String getReceiverCpf() { return receiverCpf; }
    public void setReceiverCpf(String receiverCpf) { this.receiverCpf = receiverCpf; }
    public String getSenderName() { return senderName; }
    public void setSenderName(String senderName) { this.senderName = senderName; }
    public String getReceiverName() { return receiverName; }
    public void setReceiverName(String receiverName) { this.receiverName = receiverName; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public void setOperationType(String operationType) {
        this.operationType = operationType;
    }
    public void setBalanceAfterOperation(Double balanceAfterOperation) {
        this.balanceAfterOperation = balanceAfterOperation;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setDate(LocalDateTime date) {
        this.date = date;
    }
    public void setUser(UserModel user) {
        this.user = user;
    }
}
