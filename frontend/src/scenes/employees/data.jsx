

export async function  getData(employeeService){
    const response = await employeeService.all()
    const employeesMapped = [...response.data];
    employeesMapped.map((employee) =>{
        employee.service = employee.service?.name;
        employee.func = employee.function;
        return employee

    })
    return employeesMapped;
}

export async function getDataForId(missionOrderService, empid){
    const response = await missionOrderService.all()
    const missionsMapped = [...response.data];
    missionsMapped.map((mission) =>{
        mission.employeeId = mission.employee.id;
        mission.employee = mission.employee.name + " ("+mission.employee.id+")" ;
        mission.remplacementEmployee = mission.remplacementEmployee.name + " ("+mission.remplacementEmployee.id+")";
        return mission
    })
    // filter the missionMapped where the mission.employeeId is equal to the id variable that is passed
    console.log(missionsMapped[0])
    return missionsMapped.filter((mission) => mission.employeeId == parseInt(empid))
    // return missionsMapped;
}
