package app.back_end.investments.repository;

import app.back_end.investments.model.StocksModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StocksRepository extends JpaRepository<StocksModel, Long> {

    Optional<StocksModel> findByStockIdentifierAndUserId(String stockIdentifier, Long userId);
    List<StocksModel> findAllByUserId(Long userId);
}
