package parc.controller;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.bind.annotation.*;
import parc.model.concrete.Employee;
import parc.model.concrete.MissionOrder;
import parc.model.concrete.Vehicle;
import parc.repository.EmployeeRepository;
import parc.repository.MissionOrderRepository;
import parc.repository.VehicleRepository;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/missionOrders")
public class MissionOrderController extends BaseController<MissionOrder, MissionOrderRepository> {

    private final MissionOrderRepository repository;
    private final EmployeeRepository employeeRepository;
    private final VehicleRepository vehicleRepository;

    public MissionOrderController(MissionOrderRepository repository, EmployeeRepository employeeRepository, VehicleRepository vehicleRepository) {
        super(repository);
        this.repository = repository;
        this.employeeRepository = employeeRepository;
        this.vehicleRepository = vehicleRepository;
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

    @PostMapping("/add")
    public MissionOrder create(@RequestBody Map<String, Object> params) {
        MissionOrder entity = new MissionOrder();

        entity.setMissionSubject((String) params.get("missionSubject"));
        entity.setType((String) params.get("type"));
        entity.setStartDate(LocalDate.parse((String) params.get("startDate")).atStartOfDay());
        entity.setEndDate(LocalDate.parse((String) params.get("endDate")).atStartOfDay());
        entity.setPath((String) params.get("path"));

        Map<String, Object> employeeParams = (Map<String, Object>) params.get("employee");
        Employee employee = employeeRepository.findById(Long.valueOf((Integer) employeeParams.get("id"))).orElse(null);
        if (employee != null){
            entity.setEmployee(employee);
        }
//
        Map<String, Object> remplacementEmployeeParams = (Map<String, Object>) params.get("remplacementEmployee");
        Employee remplacementEmployee = employeeRepository.findById(Long.valueOf((Integer) remplacementEmployeeParams.get("id"))).orElse(null);
        entity.setRemplacementEmployee(remplacementEmployee);

        List<Map<String, Object>> employeesParams = (List<Map<String, Object>>) params.get("employees");
        Set<Employee> employees = new HashSet<>();
        for (Map<String, Object> employeeParam : employeesParams) {
            Employee e = employeeRepository.findById(Long.valueOf((Integer) employeeParam.get("id"))).orElse(null);
            if (e != null) {
                employees.add(e);
            }
        }
        entity.setEmployees(employees);
        // saving the entity
        repository.save(entity);


        // saving the mission for the vahicle
        Map<String, Object> vehicleParams = (Map<String, Object>) params.get("vehicle");
        Vehicle vehicle = vehicleRepository.findById(Long.valueOf((Integer) vehicleParams.get("id"))).orElse(null);
        if(vehicle != null){
            Set<MissionOrder> vehicleMissions = vehicle.getOrderMissions();
            vehicleMissions.add(entity);
            vehicle.setOrderMissions(vehicleMissions);
            vehicleRepository.save(vehicle);
        }

        return entity;
    }

    @PutMapping("/update/{id}")
    public MissionOrder edit(@PathVariable Long id, @RequestBody Map<String, Object> params) {
        MissionOrder mission = repository.findById(id).orElse(null);
        // if the mission doesn't exist we throw and error..
        if(mission == null){
            throw new EntityNotFoundException("No Mission was found with the ID "+id);
        }

        mission.setMissionSubject((String) params.get("missionSubject"));
        mission.setType((String) params.get("type"));
        mission.setStartDate(LocalDate.parse((String) params.get("startDate")).atStartOfDay());
        mission.setEndDate(LocalDate.parse((String) params.get("endDate")).atStartOfDay());
        mission.setPath((String) params.get("path"));

        Map<String, Object> employeeParams = (Map<String, Object>) params.get("employee");
        Employee employee = employeeRepository.findById(Long.valueOf((Integer) employeeParams.get("id"))).orElse(null);
        if (employee != null){
            mission.setEmployee(employee);
        }

        Map<String, Object> remplacementEmployeeParams = (Map<String, Object>) params.get("remplacementEmployee");
        Employee remplacementEmployee = employeeRepository.findById(Long.valueOf((Integer) remplacementEmployeeParams.get("id"))).orElse(null);
        mission.setRemplacementEmployee(remplacementEmployee);

        List<Map<String, Object>> employeesParams = (List<Map<String, Object>>) params.get("employees");
        Set<Employee> employees = new HashSet<>();
        for (Map<String, Object> employeeParam : employeesParams) {
            Employee e = employeeRepository.findById(Long.valueOf((Integer) employeeParam.get("id"))).orElse(null);
            if (e != null) {
                employees.add(e);
            }
        }
        mission.setEmployees(employees);

        // now we gotta find the vehicle that this mission had and remove the mission from it
        Set<Vehicle> currentVehicle = vehicleRepository.findByOrderMissions(mission);
        if(!currentVehicle.isEmpty()){
            // if the mission had some vehicles , since we currently use only one vehicle, we will only be concerned with the fist element of this set
            Vehicle veh = (Vehicle) currentVehicle.toArray()[0];
            Set<MissionOrder> oldMissions = veh.getOrderMissions();
            if(!oldMissions.isEmpty()){
                oldMissions.remove(mission);
                veh.setOrderMissions(oldMissions);
            }
        }

        // saving the mission
        repository.save(mission);



        // saving the mission for the vahicle
        Map<String, Object> vehicleParams = (Map<String, Object>) params.get("vehicle");
        Vehicle vehicle = vehicleRepository.findById(Long.valueOf((Integer) vehicleParams.get("id"))).orElse(null);
        if(vehicle != null){
            // removing the mission from the list of missions in the vehicle
            Set<MissionOrder> vehicleMissions = vehicle.getOrderMissions();
            vehicleMissions.add(mission);
            vehicle.setOrderMissions(vehicleMissions);
            vehicleRepository.save(vehicle);
        }


        return mission;
    }
}