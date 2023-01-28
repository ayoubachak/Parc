package parc;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import parc.model.User;
import parc.repository.UserRepository;
import parc.model.concrete.*;
import parc.repository.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.time.LocalDate;
import java.util.Set;

@SpringBootApplication
public class ParcApplication {

    public static void main(String[] args) {
        SpringApplication.run(ParcApplication.class, args);
    }
    @Bean


    CommandLineRunner commandLineRunner(UserRepository users,CategoryRepository categories ,PieceRepository pieces,OilChangeRepository oilChanges ,VehicleStateRepository vehicleStates ,ReparationDetailsRepository reparationDetails,VehicleRepository vehicles ,EmployeeRepository employees , MissionOrderRepository orders ,ReparationRepository reparations , ServiceRepository services ,BrandRepository brands , BrandModelRepository brandmodels ,FuelCompanyRepository fuelCompanies,FuelTypeRepository fueltypes ,ConsumptionRepository consumptions , PasswordEncoder encoder  ) {

        return args -> {
            users.deleteAll();
            users.save(new User("ayoub.achak01@gmail.com",encoder.encode("ayoubachak"), "Ayoub", "Achak", "ADMIN,Directeur"));
              categories.deleteAll();
            List<Category> tcategories = Arrays.asList(
                    new Category(Long.valueOf(1), "sedan"),
                    new Category(Long.valueOf(2), "suv"),
                    new Category(Long.valueOf(3), "crossover"),
                    new Category(Long.valueOf(4), "hatchback"),
                    new Category(Long.valueOf(5), "coupe"),
                    new Category(Long.valueOf(6), "convertible"),
                    new Category(Long.valueOf(7), "wagon"),
                    new Category(Long.valueOf(8), "pickup"),
                    new Category(Long.valueOf(9), "van"),
                    new Category(Long.valueOf(10), "truck")
            );

            for (Category category : tcategories) {
                categories.save(category);
            }

            pieces.deleteAll();
            List<Piece> tpieces = Arrays.asList(
                    new Piece(1L, "brake pads"),
                    new Piece(2L, "oil filter"),
                    new Piece(3L, "transmission"),
                    new Piece(4L, "tires"),
                    new Piece(5L, "battery"),
                    new Piece(6L, "engine"),
                    new Piece(7L, "suspension"),
                    new Piece(8L, "exhaust system"),
                    new Piece(9L, "steering"),
                    new Piece(10L, "radiator")
            );

            for (Piece piece : tpieces) {
                pieces.save(piece);
            }
            oilChanges.deleteAll();
            List<OilChange> oilChangeList = Arrays.asList(
                    new OilChange(1L, 1000, LocalDateTime.parse("2022-01-01T08:00:00")),
                    new OilChange(2L, 2000, LocalDateTime.parse("2022-02-01T09:00:00")),
                    new OilChange(3L, 3000, LocalDateTime.parse("2022-03-01T18:00:00")),
                    new OilChange(4L, 4000, LocalDateTime.parse("2022-04-01T08:00:00")),
                    new OilChange(5L, 5000, LocalDateTime.parse("2022-05-01T18:30:00")),
                    new OilChange(6L, 6000, LocalDateTime.parse("2022-06-01T18:30:00")),
                    new OilChange(7L, 7000, LocalDateTime.parse("2022-07-01T18:30:00")),
                    new OilChange(8L, 8000, LocalDateTime.parse("2022-08-01T18:30:00")),
                    new OilChange(9L, 9000, LocalDateTime.parse("2022-09-01T18:30:00")),
                    new OilChange(10L, 10000, LocalDateTime.parse("2022-10-01T18:30:00"))
            );

            for (OilChange oilChange : oilChangeList) {
                oilChanges.save(oilChange);
            }


            reparationDetails.deleteAll();

            List<ReparationDetails> treparationDetails = Arrays.asList(
                    new ReparationDetails(1L, 100, "brake pads"),
                    new ReparationDetails(2L, 50, "oil change"),
                    new ReparationDetails(3L, 200, "transmission"),
                    new ReparationDetails(4L, 150, "tire change"),
                    new ReparationDetails(5L, 75, "battery replacement"),
                    new ReparationDetails(6L, 250, "engine repair"),
                    new ReparationDetails(7L, 125, "suspension"),
                    new ReparationDetails(8L, 300, "exhaust system"),
                    new ReparationDetails(9L, 175, "steering"),
                    new ReparationDetails(10L, 350, "cooling system")
            );
            for (ReparationDetails reparationDetail : treparationDetails) {
                reparationDetails.save(reparationDetail);

            }

            List<Reparation> tReparations = Arrays.asList(
                    new Reparation(1L, "100.0", 1000, LocalDateTime.parse("2022-01-01T12:40:00"), "R123", new ReparationDetails(1L, 100, "brake pads")),
                    new Reparation(2L, "200.0", 2000, LocalDateTime.parse("2022-02-01T12:40:00"), "R456", new ReparationDetails(2L, 50, "oil change")),
                    new Reparation(3L, "300.0", 3000, LocalDateTime.parse("2022-03-01T12:40:00"), "R789", new ReparationDetails(3L, 200, "transmission")),
                    new Reparation(4L, "400.0", 4000, LocalDateTime.parse("2022-04-01T12:40:00"), "R101", new ReparationDetails(4L, 150, "tire change")),
                    new Reparation(5L, "500.0", 5000, LocalDateTime.parse("2022-05-01T12:40:00"), "R112", new ReparationDetails(5L, 75, "battery replacement")),
                    new Reparation(6L, "600.0", 6000, LocalDateTime.parse("2022-06-01T12:40:00"), "R113", new ReparationDetails(6L, 250, "engine repair")),
                    new Reparation(7L, "700.0", 7000, LocalDateTime.parse("2022-07-01T12:40:00"), "R114", new ReparationDetails(7L, 125, "suspension")),
                    new Reparation(8L, "800.0", 8000, LocalDateTime.parse("2022-08-01T12:40:00"), "R115", new ReparationDetails(8L, 300, "exhaust system")),
                    new Reparation(9L, "900.0", 9000, LocalDateTime.parse("2022-09-01T12:40:00"), "R116", new ReparationDetails(9L, 175, "steering")),
                    new Reparation(10L, "1000.0", 10000, LocalDateTime.parse("2022-10-01T12:40:00"), "R117", new ReparationDetails(10L, 350, "cooling system"))
            );

            for (Reparation reparation : tReparations) {
                reparations.save(reparation);
            }

            services.deleteAll();
            List<Service> tservices = Arrays.asList(
                    new Service(Long.valueOf(1), "Maintenance"),
                    new Service(Long.valueOf(2), "Repair"),
                    new Service(Long.valueOf(3), "Cleaning"),
                    new Service(Long.valueOf(4), "Inspection"),
                    new Service(Long.valueOf(5), "Towing"),
                    new Service(Long.valueOf(6), "Detailing"),
                    new Service(Long.valueOf(7), "Body work"),
                    new Service(Long.valueOf(8), "Oil change"),
                    new Service(Long.valueOf(9), "Battery replacement"),
                    new Service(Long.valueOf(10), "Tire rotation")
            );

            for (Service service : tservices) {
                services.save(service);
            }

            fuelCompanies.deleteAll();
            List<FuelCompany> tfuelCompanies = Arrays.asList(
                    new FuelCompany(Long.valueOf(1), "Exxon"),
                    new FuelCompany(Long.valueOf(2), "BP"),
                    new FuelCompany(Long.valueOf(3), "Shell"),
                    new FuelCompany(Long.valueOf(4), "Chevron"),
                    new FuelCompany(Long.valueOf(5), "ConocoPhillips"),
                    new FuelCompany(Long.valueOf(6), "Valero"),
                    new FuelCompany(Long.valueOf(7), "Phillips 66"),
                    new FuelCompany(Long.valueOf(8), "Marathon Petroleum"),
                    new FuelCompany(Long.valueOf(9), "Hess Corporation"),
                    new FuelCompany(Long.valueOf(10), "CITGO")
            );
            for (FuelCompany fuelCompany : tfuelCompanies) {
                fuelCompanies.save(fuelCompany);
            }

            brands.deleteAll();
            List<Brand> tbrands = Arrays.asList(
                    new Brand(Long.valueOf(1), "Ford"),
                    new Brand(Long.valueOf(2), "Chevrolet"),
                    new Brand(Long.valueOf(3), "Toyota"),
                    new Brand(Long.valueOf(4), "Honda"),
                    new Brand(Long.valueOf(5), "Tesla"),
                    new Brand(Long.valueOf(6), "BMW"),
                    new Brand(Long.valueOf(7), "Mercedes"),
                    new Brand(Long.valueOf(8), "Audi"),
                    new Brand(Long.valueOf(9), "Fiat"),
                    new Brand(Long.valueOf(10), "Mazda")
            );
            for (Brand brand : tbrands) {
                brands.save(brand);
            }

            brandmodels.deleteAll();
            List<BrandModel> brandModels = Arrays.asList(
                    new BrandModel(Long.valueOf(1), "Fiesta", new Brand(Long.valueOf(1), "Ford")),
                    new BrandModel(Long.valueOf(2), "Mustang", new Brand(Long.valueOf(1), "Ford")),
                    new BrandModel(Long.valueOf(3), "Camaro", new Brand(Long.valueOf(2), "Chevrolet")),
                    new BrandModel(Long.valueOf(4), "Corolla", new Brand(Long.valueOf(3), "Toyota")),
                    new BrandModel(Long.valueOf(5), "Civic", new Brand(Long.valueOf(4), "Honda")),
                    new BrandModel(Long.valueOf(6), "Model S", new Brand(Long.valueOf(5), "Tesla")),
                    new BrandModel(Long.valueOf(7), "X5", new Brand(Long.valueOf(6), "BMW")),
                    new BrandModel(Long.valueOf(8), "C-Class", new Brand(Long.valueOf(7), "Mercedes")),
                    new BrandModel(Long.valueOf(9), "A3", new Brand(Long.valueOf(8), "Audi")),
                    new BrandModel(Long.valueOf(10), "500", new Brand(Long.valueOf(9), "Fiat"))
            );
            for (BrandModel brandModel : brandModels) {
                brandmodels.save(brandModel);
            }

            fueltypes.deleteAll();
            List<FuelType> tFuelTypes = Arrays.asList(
                    new FuelType(Long.valueOf(1), "Gasoline"),
                    new FuelType(Long.valueOf(2), "Diesel"),
                    new FuelType(Long.valueOf(3), "Electric"),
                    new FuelType(Long.valueOf(4), "Hybrid"),
                    new FuelType(Long.valueOf(5), "Hydrogen"),
                    new FuelType(Long.valueOf(6), "Ethanol"),
                    new FuelType(Long.valueOf(7), "Propane"),
                    new FuelType(Long.valueOf(8), "Natural Gas"),
                    new FuelType(Long.valueOf(9), "Biodiesel"),
                    new FuelType(Long.valueOf(10), "Liquified Petroleum Gas")
            );

            for (FuelType fuelType : tFuelTypes) {
                fueltypes.save(fuelType);
            }


            vehicles.deleteAll();
            List<Vehicle> tvehicles = Arrays.asList(
                    new Vehicle(1L,"red", "abc123", "sedan", 4, 150, 20000, new BrandModel(1L,"Fiesta",new Brand(1L,"Ford")), new Category(1L,"car"), new FuelType(1L,"Gasoline"),new Reparation(2L, "200.0", 2000, LocalDateTime.parse("2022-02-01T12:40:00"), "R456", new ReparationDetails(2L, 50, "oil change")),  new Service(1L,"wash"),null,null),
                    new Vehicle(2L,"blue", "def456", "suv", 7, 200, 30000, new BrandModel(2L,"Mustang",new Brand(1L,"Ford")), new Category(2L,"SUV"), new FuelType(2L,"Diesel"),new Reparation(2L, "200.0", 2000, LocalDateTime.parse("2022-02-01T12:40:00"), "R456", new ReparationDetails(2L, 50, "oil change")),
                            new Service(2L,"polish"),null,null),
                    new Vehicle(3L,"green", "ghi789", "truck", 2, 100, 10000, new BrandModel(3L,"Camaro",new Brand(2L,"Chevrolet")), new Category(3L,"truck"), new FuelType(3L,"Electric"),new Reparation(3L, "300.0", 3000, LocalDateTime.parse("2022-03-01T12:40:00"), "R789", new ReparationDetails(3L, 200, "transmission")),
                             new Service(3L,"interior cleaning"),null,null),
                    new Vehicle(4L,"yellow", "jkl012", "coupe", 2, 250, 25000, new BrandModel(4L,"Corolla",new Brand(3L,"Toyota")), new Category(4L,"coupe"), new FuelType(4L,"Hybrid"),new Reparation(4L, "400.0", 4000, LocalDateTime.parse("2022-04-01T12:40:00"), "R101", new ReparationDetails(4L, 150, "tire change")),
                             new Service(4L,"engine cleaning"),null,null),
                    new Vehicle(5L,"black", "mno345", "convertible", 2, 200, 35000, new BrandModel(5L,"Civic",new Brand(4L,"Honda")), new Category(5L,"convertible"), new FuelType(5L,"Hydrogen"),new Reparation(5L, "500.0", 5000, LocalDateTime.parse("2022-05-01T12:40:00"), "R112", new ReparationDetails(5L, 75, "battery replacement")),
                             new Service(5L,"detailing"),null,null),
                    new Vehicle(6L,"white", "pqr678", "van", 8, 150, 20000, new BrandModel(6L,"Model S",new Brand(5L,"Tesla")), new Category(6L,"van"), new FuelType(6L,"Ethanol"),new Reparation(6L, "600.0", 6000, LocalDateTime.parse("2022-06-01T12:40:00"), "R113", new ReparationDetails(6L, 250, "engine repair")),
                             new Service(6L,"tune-up"),null,null),
                    new Vehicle(7L,"gray", "stu901", "bus", 20, 100, 10000, new BrandModel(7L,"X5",new Brand(6L,"BMW")), new Category(7L,"bus"), new FuelType(7L,"Propane"),new Reparation(7L, "700.0", 7000, LocalDateTime.parse("2022-07-01T12:40:00"), "R114", new ReparationDetails(7L, 125, "suspension")),
                            new Service(7L,"oil change"),null,null),
                    new Vehicle(8L,"orange", "vwx234", "sports car", 2, 350, 50000, new BrandModel(8L,"C-Class",new Brand(7L,"Mercedes")), new Category(8L,"sports car"), new FuelType(8L,"Natural Gas"),new Reparation(8L, "800.0", 8000, LocalDateTime.parse("2022-08-01T12:40:00"), "R115", new ReparationDetails(8L, 300, "exhaust system")),
                             new Service(8L,"polish"),null,null),
                    new Vehicle(9L,"purple", "yza567", "compact", 4, 150, 20000, new BrandModel(9L,"A3",new Brand(8L,"Audi")), new Category(9L,"compact"), new FuelType(9L,"Biodiesel"),new Reparation(9L, "900.0", 9000, LocalDateTime.parse("2022-09-01T12:40:00"), "R116", new ReparationDetails(9L, 175, "steering")),
                             new Service(9L,"interior cleaning"),null,null));
                    Set<Vehicle> the_vehicles=new HashSet<>();
                    for (Vehicle vehicle:tvehicles) {

                        the_vehicles.add(vehicle);
                        vehicles.save(vehicle);
                    }

            vehicleStates.deleteAll();
            List<VehicleState> tvehicleStates = Arrays.asList(
                    new VehicleState(1L, LocalDateTime.parse("2022-11-01T00:00:00"), LocalDateTime.parse("2022-01-01T00:00:00"), "Running",the_vehicles),
                    new VehicleState(2L, LocalDateTime.parse("2022-12-01T12:40:00"), LocalDateTime.parse("2022-02-01T12:40:00" ), "Stopped",null),
                    new VehicleState(3L, LocalDateTime.parse("2023-01-01T16:01:00"), LocalDateTime.parse("2022-03-01T16:01:00"), "Running",null),
                    new VehicleState(4L, LocalDateTime.parse("2023-02-01T17:00:00"), LocalDateTime.parse("2022-04-01T17:00:00"), "Stopped",the_vehicles),
                    new VehicleState(5L, LocalDateTime.parse("2023-03-01T16:00:00"), LocalDateTime.parse("2022-05-01T16:00:00"), "Running",null),
                    new VehicleState(6L, LocalDateTime.parse("2023-04-01T13:00:00"), LocalDateTime.parse("2022-06-01T13:00:00"), "Stopped",null),
                    new VehicleState(7L, LocalDateTime.parse("2023-05-01T12:00:00"), LocalDateTime.parse("2022-07-01T12:00:00"), "Running",null),
                    new VehicleState(8L, LocalDateTime.parse("2023-06-01T16:00:00"), LocalDateTime.parse("2022-08-01T16:00:00"), "Stopped",null),
                    new VehicleState(9L, LocalDateTime.parse("2023-07-01T17:00:00"), LocalDateTime.parse("2022-09-01T17:00:00"), "Stopped",null)
            );

            for (VehicleState vehicleState : tvehicleStates) {

                vehicleStates.save(vehicleState);
            }

                    employees.deleteAll();
            List<Employee> temployees = Arrays.asList(
                    new Employee(1L, "Driver", "John Doe", new Service(1L, "wash"),null),
                    new Employee(2L, "Driver", "Jane Smith", new Service(2L, "maintenance"),null),
                    new Employee(3L, "Driver", "Bob Johnson", new Service(3L, "inspection"),null),
                    new Employee(4L, "Driver", "Emily Davis", new Service(4L, "oil change"),null),
                    new Employee(5L, "Manager", "Michael Brown", new Service(5L, "tire rotation"),null),
                    new Employee(6L, "Manager", "Sarah Miller", new Service(6L, "brake repair"),null),
                    new Employee(7L, "Manager", "David Wilson", new Service(7L, "battery replacement"),null),
                    new Employee(8L, "Manager", "Jessica Moore", new Service(8L, "transmission repair"),null),
                    new Employee(9L, "Manager", "William Taylor", new Service(9L, "engine repair"),null),
                    new Employee(10L,"Manager", "Ashley Anderson", new Service(10L, "detailing"),null)
            );
            Set<Employee> the_employees=new HashSet<>();
            for (Employee employee:temployees)
            {
                the_employees.add(employee);

                employees.save(employee);
            }

            orders.deleteAll();
            Employee employee1 = new Employee(1L, "Driver", "John Doe", new Service(1L, "wash"),null);
            Employee employee2 = new Employee(2L, "Driver", "Jane Smith", new Service(2L, "maintenance"),null);
            Employee employee3 = new Employee(3L, "Driver", "Bob Johnson", new Service(3L, "inspection"),null);
            Employee employee4 = new Employee(4L, "Driver", "Emily Davis", new Service(4L, "oil change"),null);
            Employee employee5 = new Employee(5L, "Manager", "Michael Brown", new Service(5L, "tire rotation"),null);
            Employee employee6 = new Employee(6L, "Manager", "Sarah Miller", new Service(6L, "brake repair"),null);
            Employee employee7 = new Employee(7L, "Manager", "David Wilson", new Service(7L, "battery replacement"),null);
            Employee employee8 = new Employee(8L, "Manager", "Jessica Moore", new Service(8L, "transmission repair"),null);
            Employee employee9 = new Employee(9L, "Manager", "William Taylor", new Service(9L, "engine repair"),null);
            Employee employee10 = new Employee(10L, "Manager", "Ashley Anderson", new Service(10L, "detailing"),null);

            List<MissionOrder> torders=Arrays.asList(
                    new MissionOrder(9L,employee1, LocalDateTime.parse("2022-03-01T12:40:00"), "Transport goods", "Route 1", LocalDateTime.parse("2022-01-01T12:40:00"), "Transportation", employee2, the_vehicles,the_employees),
             new MissionOrder(1L,employee2, LocalDateTime.parse("2022-04-01T12:40:00"), "Transport passengers", "Route 2",LocalDateTime.parse( "2022-02-01T12:40:00"), "Transportation", employee3,null,null ),
             new MissionOrder(2L,employee3, LocalDateTime.parse("2022-05-01T12:40:00"), "Transport equipment", "Route 3", LocalDateTime.parse("2022-03-01T12:40:00"), "Transportation", employee4, null,null),
             new MissionOrder(3L,employee4, LocalDateTime.parse("2022-06-01T12:40:00"), "Transport materials", "Route 4", LocalDateTime.parse("2022-04-01T12:40:00"), "Transportation", employee5,null,null),
             new MissionOrder(4L,employee5, LocalDateTime.parse("2022-07-01T12:40:00"), "Transport goods", "Route 5", LocalDateTime.parse("2022-05-01T12:40:00"), "Transportation", employee6, null ,null),
             new MissionOrder(5L,employee6, LocalDateTime.parse("2022-08-01T12:40:00"), "Transport passengers", "Route 6", LocalDateTime.parse("2022-06-01T12:40:00"), "Transportation", employee7, null,null),
             new MissionOrder(6L,employee7, LocalDateTime.parse("2022-09-01T12:40:00"), "Transport equipment", "Route 7",LocalDateTime.parse( "2022-07-01T12:40:00"), "Transportation", employee8, null,null),
             new MissionOrder(7L,employee8, LocalDateTime.parse("2022-10-01T12:40:00"), "Transport materials", "Route 8", LocalDateTime.parse("2022-08-01T12:40:00"), "Transportation", employee9, null,null),
             new MissionOrder(8L,employee9, LocalDateTime.parse("2022-11-01T12:40:00"), "Transport goods", "Route 9", LocalDateTime.parse("2022-09-01T12:40:00"), "Transportation", employee10,the_vehicles,the_employees )
            );
            for (MissionOrder order:torders)
            {


                orders.save(order);
            }
            FuelCompany fuelCompany1 = new FuelCompany(1L, "Acme Inc.");
            FuelCompany fuelCompany2 = new FuelCompany(2L, "FuelCo");
            FuelCompany fuelCompany3 = new FuelCompany(3L, "Petro Corp");
            FuelCompany fuelCompany4 = new FuelCompany(4L, "Energy Inc");
            FuelCompany fuelCompany5 = new FuelCompany(5L, "Power Co");
        consumptions.deleteAll();
            List<Consumption> tconsumptions=Arrays.asList(
                    new Consumption(1L, LocalDateTime.parse("2022-01-01T00:00:00"), 100, 2.5f, 50, new FuelCompany(1L, "Acme Inc.")),
             new Consumption(2L, LocalDateTime.parse("2022-01-02T00:00:00"), 200, 3.5f, 60, new FuelCompany(2L, "FuelCo")),
             new Consumption(3L, LocalDateTime.parse("2022-01-03T00:00:00"), 300, 4.5f, 70, new FuelCompany(3L, "Petro Corp")),
             new Consumption(4L, LocalDateTime.parse("2022-01-04T00:00:00"), 400, 5.5f, 80, new FuelCompany(4L, "Energy Inc")),
             new Consumption(5L, LocalDateTime.parse("2022-01-05T00:00:00"), 500, 6.5f, 90, new FuelCompany(5L, "Power Co")),
             new Consumption(6L, LocalDateTime.parse("2022-01-06T00:00:00"), 600, 7.5f, 100, new FuelCompany(1L, "Acme Inc.")),
             new Consumption(7L, LocalDateTime.parse("2022-01-07T00:00:00"), 700, 8.5f, 110, new FuelCompany(2L, "FuelCo")),
             new Consumption(8L, LocalDateTime.parse("2022-01-08T00:00:00"), 800, 9.5f, 120, new FuelCompany(3L, "Petro Corp")),
             new Consumption(9L, LocalDateTime.parse("2022-01-09T00:00:00"), 900, 10.5f, 130, new FuelCompany(4L, "Energy Inc")),
             new Consumption(10L, LocalDateTime.parse("2022-01-10T00:00:00"), 1000, 11.5f, 140, new FuelCompany(5L, "Power Co"))



            );
            for(Consumption consumption:tconsumptions)
            {
                consumptions.save(consumption);
            }
        };


    }
}
