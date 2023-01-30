package parc.controller;

import org.springframework.web.bind.annotation.*;
import parc.model.concrete.Brand;
import parc.repository.BrandRepository;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
public class BrandController extends BaseController<Brand, BrandRepository> {

    private final BrandRepository repository;

    public BrandController(BrandRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @GetMapping("/all")
    public List<Brand> all(){
        return (List<Brand>) repository.findAll();
    }

}
