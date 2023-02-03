import {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";


export const getData = async (consumptionService)=>{
    const response = await consumptionService.all()
    const consumptionsMapped = [...response.data];
    consumptionsMapped.map((consumption) =>{
        consumption.fuelCompany = consumption.fuelCompany?.name;
        return consumption

    })
    return consumptionsMapped
}


export function consumptionMapping(vehicles){
    const vehiclesMapped = [...vehicles];
    vehiclesMapped.map((vehicle) =>{
        vehicle.consumption = vehicle.consumption.toFixed(2);
        return vehicle;
    })
    return vehiclesMapped;
}
