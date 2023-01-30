

export default async function getData(vehicleService){
    const response = await vehicleService.all()

    return vehicleMapping(response.data);
}

export function vehicleMapping(vehicles){
    const vehiclesMapped = [...vehicles];
    vehiclesMapped.map((vehicle) =>{
        vehicle.brandmodel = vehicle?.brandModel?.name;
        vehicle.brand = vehicle?.brandModel?.brand?.name;
        vehicle.fuelType = vehicle.fuelType.name;
        vehicle.category = vehicle.category.name;
        vehicle.service = vehicle.service.name;
        vehicle.reparation = vehicle.reparation && (vehicle.reparation.reparationDetails.type  + "( "+vehicle.reparation.reparationReference+" ) | Bill : "+vehicle.reparation.bill + "$") || "" ;
        return vehicle

    })
    return vehiclesMapped;
}