package parc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.MissionOrder;
import parc.repository.MissionOrderRepository;

@RestController
@RequestMapping("/api/missionorder")
public class MissionOrderController extends BaseController<MissionOrder, MissionOrderRepository> {

    private final MissionOrderRepository repository;

    public MissionOrderController(MissionOrderRepository repository) {
        super(repository);
        this.repository = repository;
    }
}