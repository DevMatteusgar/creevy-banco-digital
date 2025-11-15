package app.back_end.investments.repository;

import app.back_end.investments.model.StocksTransferModel;
import app.back_end.transfer.model.TransferModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StocksTransfersRepository extends JpaRepository<StocksTransferModel, Long> {
    List<StocksTransferModel> findAllByStock_User_EmailOrderByCreationDateDesc(String email);
}
