package app.back_end.investments.exceptions;

public class InsuficientInvestmentsFundsException extends RuntimeException {
    public InsuficientInvestmentsFundsException(String message) {
        super(message);
    }
}
