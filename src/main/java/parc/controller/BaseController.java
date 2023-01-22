package parc.controller;

import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.*;
import parc.model.User;

import java.util.List;

@RequestMapping("/api")
public class BaseController<T, R extends CrudRepository<T, Long>> {

    private R repository;

    public BaseController(R repository) {
        this.repository = repository;
    }

    @GetMapping("/")
    public List<T> getAll() {
        return (List<T>) repository.findAll();
    }

    @PostMapping("/")
    public T create(@RequestBody T entity) {
        return repository.save(entity);
    }

    @GetMapping("/{id}")
    public T getById(@PathVariable long id) {
        return repository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public T update(@PathVariable long id, @RequestBody T entity) {
        return repository.save(entity);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        repository.deleteById(id);
    }

    @GetMapping("/count")
    public long count() {
        return repository.count();
    }

}
