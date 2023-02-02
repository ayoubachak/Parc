import {vehicleMapping} from "../vehicles/data";
import {createMissionOrderService} from "../../services/services";


export  async function getVehicleCount(vehicleService){
    const response = await vehicleService.count()

    return response.data;
}


export  async function getEmployeeCount(EmployeeService){
    const response = await EmployeeService.count()

    return response.data;
}

export  async function getMissionCount(MissionOrderService){
    const response = await MissionOrderService.count()

    return response.data;
}

export  async function getMissionSubjectCount(MissionOrderService){
    const response = await MissionOrderService.subjects()
    return response.data;
}