

export const getData = async (consumptionService)=>{
    const response = await consumptionService.all()
    const consumptionsMapped = [...response.data];
    consumptionsMapped.map((consumption) =>{
        consumption.fuelCompany = consumption.fuelCompany?.name;
        return consumption

    })
    return consumptionsMapped
}

