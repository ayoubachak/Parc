package parc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.BrandModel;
import parc.repository.BrandModelRepository;

import java.util.List;

@RestController
@RequestMapping("/api/brandModels")
public class BrandModelController extends BaseController<BrandModel, BrandModelRepository> {

    private final BrandModelRepository repository;

    public BrandModelController(BrandModelRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @GetMapping("/all")
    public List<BrandModel> all(){
        return (List<BrandModel>) repository.findAll();
    }
}
