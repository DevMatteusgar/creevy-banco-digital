package app.back_end.transfer.repository;


import app.back_end.transfer.model.TransferModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferRepository extends JpaRepository<TransferModel, Long> {
}
