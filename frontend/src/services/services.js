



const baseURL = 'http://localhost:8080';

export function createUserService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/user/all`),
        add: async (user) => await authAxios.post(`${baseURL}/user/add`, user),
        update: async (id, user) => await authAxios.put(`${baseURL}/user/upd/${id}`, user),
        delete: async (id) => await authAxios.delete(`${baseURL}/user/del/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/user/get/${id}`),
        count: async () => await authAxios.get(`${baseURL}/user/count`),
        me: async  ()=> await authAxios.get(`${baseURL}/user/me`)

    }
}

export function createBrandService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/brands`),
        add: async (brand) => await authAxios.post(`${baseURL}/brands`, brand),
        update: async (id, brand) => await authAxios.put(`${baseURL}/brands/${id}`, brand),
        delete: async (id) => await authAxios.delete(`${baseURL}/brands/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/brands/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/brands/count`),

    }
}
export function createCategoryService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/categories`),
        add: async (category) => await authAxios.post(`${baseURL}/categories`, category),
        update: async (id, category) => await authAxios.put(`${baseURL}/categories/${id}`, category),
        delete: async (id) => await authAxios.delete(`${baseURL}/categories/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/categories/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/categories/count`)

    }
}

export function createBrandModelService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/brandmodels`),
        add: async (brandModel) => await authAxios.post(`${baseURL}/brandmodels`, brandModel),
        update: async (id, brandModel) => await authAxios.put(`${baseURL}/brandmodels/${id}`, brandModel),
        delete: async (id) => await authAxios.delete(`${baseURL}/brandmodels/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/brandmodels/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/brandmodels/count`),

    }
}
export function createConsumptionService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/consumptions`),
        add: async (consumption) => await authAxios.post(`${baseURL}/consumptions`, consumption),
        update: async (id, consumption) => await authAxios.put(`${baseURL}/consumptions/${id}`, consumption),
        delete: async (id) => await authAxios.delete(`${baseURL}/consumptions/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/consumptions/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/consumptions/count`)

    }
}
export function createEmployeeService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/employees`),
        add: async (employee) => await authAxios.post(`${baseURL}/employees`, employee),
        update: async (id, employee) => await authAxios.put(`${baseURL}/employees/${id}`, employee),
        delete: async (id) => await authAxios.delete(`${baseURL}/employees/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/employees/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/employees/count`)

    }
}
export function createFuelCompanyService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/fuelcompanies`),
        add: async (fuelCompany) => await authAxios.post(`${baseURL}/fuelcompanies`, fuelCompany),
        update: async (id, fuelCompany) => await authAxios.put(`${baseURL}/fuelcompanies/${id}`, fuelCompany),
        delete: async (id) => await authAxios.delete(`${baseURL}/fuelcompanies/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/fuelcompanies/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/fuelcompanies/count`),

    }
}
export function createFuelTypeService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/fueltypes`),
        add: async (fuelType) => await authAxios.post(`${baseURL}/fueltypes`, fuelType),
        update: async (id, fuelType) => await authAxios.put(`${baseURL}/fueltypes/${id}`, fuelType),
        delete: async (id) => await authAxios.delete(`${baseURL}/fueltypes/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/fueltypes/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/fueltypes/count`)

    }
}
export function createMissionOrderService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/missionorders`),
        add: async (missionOrder) => await authAxios.post(`${baseURL}/missionorders`, missionOrder),
        update: async (id, missionOrder) => await authAxios.put(`${baseURL}/missionorders/${id}`, missionOrder),
        delete: async (id) => await authAxios.delete(`${baseURL}/missionorders/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/missionorders/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/missionorders/count`)

    }
}

export function createOilChangeService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/oilchanges`),
        add: async (oilchange) => await authAxios.post(`${baseURL}/oilchanges`, oilchange),
        update: async (id, oilchange) => await authAxios.put(`${baseURL}/oilchanges/${id}`, oilchange),
        delete: async (id) => await authAxios.delete(`${baseURL}/oilchanges/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/oilchanges/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/oilchanges/count`),

    }
}
export function createPieceService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/pieces`),
        add: async (piece) => await authAxios.post(`${baseURL}/pieces`, piece),
        update: async (id, piece) => await authAxios.put(`${baseURL}/pieces/${id}`, piece),
        delete: async (id) => await authAxios.delete(`${baseURL}/pieces/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/pieces/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/pieces/count`)

    }
}
export function createReparationService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/reparations`),
        add: async (reparation) => await authAxios.post(`${baseURL}/reparations`, reparation),
        update: async (id, reparation) => await authAxios.put(`${baseURL}/reparations/${id}`, reparation),
        delete: async (id) => await authAxios.delete(`${baseURL}/reparations/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/reparations/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/reparations/count`)

    }
}

export function createReparationDetailsService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/reparationdetails`),
        add: async (reparationdetails) => await authAxios.post(`${baseURL}/reparationdetails`, reparationdetails),
        update: async (id, reparationdetails) => await authAxios.put(`${baseURL}/reparationdetails/${id}`, reparationdetails),
        delete: async (id) => await authAxios.delete(`${baseURL}/reparationdetails/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/reparationdetails/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/reparationdetails/count`),

    }
}

export function createServiceService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/services`),
        add: async (service) => await authAxios.post(`${baseURL}/services`, service),
        update: async (id, service) => await authAxios.put(`${baseURL}/services/${id}`, service),
        delete: async (id) => await authAxios.delete(`${baseURL}/services/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/services/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/services/count`)

    }
}

export function createVehicleService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/vehicles`),
        add: async (vehicle) => await authAxios.post(`${baseURL}/vehicles`, vehicle),
        update: async (id, vehicle) => await authAxios.put(`${baseURL}/vehicles/${id}`, vehicle),
        delete: async (id) => await authAxios.delete(`${baseURL}/vehicles/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/vehicles/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/vehicles/count`)

    }
}

export function createVehicleStateService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/vehiclestates`),
        add: async (vehiclestate) => await authAxios.post(`${baseURL}/vehiclestates`, vehiclestate),
        update: async (id, vehiclestate) => await authAxios.put(`${baseURL}/vehiclestates/${id}`, vehiclestate),
        delete: async (id) => await authAxios.delete(`${baseURL}/vehiclestates/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/vehiclestates/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/vehiclestates/count`)

    }
}
