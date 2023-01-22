import os

models = ["FuelCompany", "FuelType", "MissionOrder", "OilChange", "Piece", "Reparation", "ReparationDetails", "Service", "Vehicle", "VehicleState"]

for model in models:
    # create repository file
    repo_file = open(f"{model}Repository.java", "w")
    repo_file.write(f"package parc.repository;\n\n")
    repo_file.write(f"import org.springframework.data.repository.CrudRepository;\n")
    repo_file.write(f"import parc.model.concrete.{model};\n\n")
    repo_file.write(f"public interface {model}Repository extends CrudRepository<{model}, Long> {{\n\n}}")
    repo_file.close()

    # create controller file
    controller_file = open(f"{model}Controller.java", "w")
    controller_file.write(f"package parc.controller;\n\n")
    controller_file.write(f"import org.springframework.web.bind.annotation.RequestMapping;\n")
    controller_file.write(f"import org.springframework.web.bind.annotation.RestController;\n")
    controller_file.write(f"import parc.model.concrete.{model};\n")
    controller_file.write(f"import parc.repository.{model}Repository;\n\n")
    controller_file.write(f"@RestController\n")
    controller_file.write(f"@RequestMapping(\"/api/{model.lower()}\")\n")
    controller_file.write(f"public class {model}Controller extends BaseController<{model}, {model}Repository> {{\n\n")
    controller_file.write(f"    private final {model}Repository repository;\n\n")
    controller_file.write(f"    public {model}Controller({model}Repository repository) {{\n")
    controller_file.write(f"        super(repository);\n")
    controller_file.write(f"        this.repository = repository;\n")
    controller_file.write(f"    }}\n}}")
    controller_file.close()

