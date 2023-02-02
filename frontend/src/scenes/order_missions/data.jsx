
const getData = async  (missionOrderService)=>{
    const response = await missionOrderService.all()
    const missionsMapped = [...response.data];
    missionsMapped.map((mission) =>{
        mission.employee = (mission.employee && ( mission.employee.name + " ("+mission.employee.id+")")) || "No Employee";
        mission.remplacementEmployee = (mission.remplacementEmployee && mission.remplacementEmployee.name) || "No replacements Emp";
        return mission
    })
    return missionsMapped;

}

export default getData;