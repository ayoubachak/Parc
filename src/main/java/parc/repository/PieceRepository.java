package parc.repository;

import org.springframework.data.repository.CrudRepository;
import parc.model.concrete.Piece;

public interface PieceRepository extends CrudRepository<Piece, Long> {
    long count();
}