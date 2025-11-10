package app.back_end.user.service;

import app.back_end.auth.model.UserModel;
import app.back_end.auth.repository.UserRepository;
import app.back_end.transfer.dto.response.UserBalanceDtoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserBalanceService {

    @Autowired
    private UserRepository userRepository;

    public UserBalanceDtoResponse getMyBalance(String email) {
        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return new UserBalanceDtoResponse(
                user.getId(),
                user.getTotalBalance(),
                user.getSavingsBalance(),
                user.getInvestmentsBalance()
        );
    }
}
