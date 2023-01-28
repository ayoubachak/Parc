package parc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.BrandModel;
import parc.repository.BrandModelRepository;

@RestController
@RequestMapping("/api/brandModels")
public class BrandModelController extends BaseController<BrandModel, BrandModelRepository> {

    private final BrandModelRepository repository;

    public BrandModelController(BrandModelRepository repository) {
        super(repository);
        this.repository = repository;
    }
}
