package app.back_end.transfer.repository;

import app.back_end.transfer.model.TransferModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransferRepository extends JpaRepository<TransferModel, Long> {

    List<TransferModel> findBySenderIdOrReceiverId(Long senderId, Long receiverId);
}
