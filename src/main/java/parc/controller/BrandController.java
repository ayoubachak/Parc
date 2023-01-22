package parc.controller;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.*;
import parc.model.User;
import parc.model.concrete.Brand;
import parc.repository.BrandRepository;

import java.util.List;

@RestController
@RequestMapping("/brands")
public class BrandController extends BaseController<Brand, BrandRepository> {

    private final BrandRepository repository;

    public BrandController(BrandRepository repository) {
        super(repository);
        this.repository = repository;
    }

}
