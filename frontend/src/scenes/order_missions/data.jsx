
const getData = async  (missionOrderService)=>{
    const response = await missionOrderService.all()
    const missionsMapped = [...response.data];
    missionsMapped.map((mission) =>{
        mission.employee = mission.employee.name + " ("+mission.employee.id+")";
        mission.remplacementEmployee = mission.remplacementEmployee.name;
        return mission
    })
    return missionsMapped;

}

export default getData;