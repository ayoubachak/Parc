import {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";


const getData = async (vehicleService)=>{
    const response = await vehicleService.all()
    const vehiclesMapped = [...response.data];
    vehiclesMapped.map((vehicle) =>{
        vehicle.brandmodel = vehicle?.brandModel?.name;
        vehicle.brand = vehicle?.brandModel?.brand?.name;
        vehicle.fuelType = vehicle.fuelType.name;
        vehicle.category = vehicle.category.name;
        return vehicle

    })
    return vehiclesMapped;
}

export default getData;