import {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";


const getData = async (consumptionService)=>{
    const response = await consumptionService.all()
    const consumptionsMapped = [...response.data];
    consumptionsMapped.map((consumption) =>{
        consumption.fuelCompany = consumption.fuelCompany?.name;
        return consumption

    })
    return consumptionsMapped
}

export default getData;