package parc.controller;

import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.MissionOrder;
import parc.repository.MissionOrderRepository;

import java.util.List;

@RestController
@RequestMapping("/api/missionOrders")
public class MissionOrderController extends BaseController<MissionOrder, MissionOrderRepository> {

    private final MissionOrderRepository repository;

    public MissionOrderController(MissionOrderRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @GetMapping("/all")
    public List<MissionOrder> all(){
        return (List<MissionOrder>) repository.findAll();
    }

    @GetMapping("/count")
    public long count() {
        return repository.count();
    }

    @GetMapping("/subjects")
    public long subjects() {
        return repository.subjects();
    }
}