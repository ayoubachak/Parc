package parc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.Category;
import parc.repository.CategoryRepository;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController extends BaseController<Category, CategoryRepository> {

    private final CategoryRepository repository;

    public CategoryController(CategoryRepository repository) {
        super(repository);
        this.repository = repository;
    }
    @GetMapping("/all")
    public List<Category> all(){
        return (List<Category>) repository.findAll();
    }

}
