package parc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.Piece;
import parc.repository.PieceRepository;

@RestController
@RequestMapping("/api/piece")
public class PieceController extends BaseController<Piece, PieceRepository> {

    private final PieceRepository repository;

    public PieceController(PieceRepository repository) {
        super(repository);
        this.repository = repository;
    }
}