

/*
* Fun Fact: not all the APIs are tested :), I don't have time to test them all.
* I could just start testing them all, but after I made the BaseController, I tought that I can just map all the controller by extending them from the base controller. but it did not work like so.
* Something interesting happens tho is that the name is getting mapped directly depending on the name of the model:
* - for example if the name of the mode is Brand, all the endpoints will be mapped to /brands (it makes it lowercase and automatically makes it plural )
* - here are some other examples : * Category -> /categories
*                                  * BrandModel -> /brandModels
*                                  * ReparationDetails -> /reparationDetailses ( it's not that smart after all XD )
*                                  * etc...
*
* */

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
        getAll: async () => await authAxios.get(`${baseURL}/brandModels`),
        add: async (brandModel) => await authAxios.post(`${baseURL}/brandModels`, brandModel),
        update: async (id, brandModel) => await authAxios.put(`${baseURL}/brandModels/${id}`, brandModel),
        delete: async (id) => await authAxios.delete(`${baseURL}/brandModels/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/brandModels/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/brandModels/count`),

    }
}
export function createConsumptionService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/consumptions`),
        add: async (consumption) => await authAxios.post(`${baseURL}/consumptions`, consumption),
        update: async (id, consumption) => await authAxios.put(`${baseURL}/consumptions/${id}`, consumption),
        delete: async (id) => await authAxios.delete(`${baseURL}/consumptions/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/consumptions/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/consumptions/count`),
        all: async () => await authAxios.get(`${baseURL}/api/consumptions/all`)
    }
}
export function createEmployeeService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/employees`),
        add: async (employee) => await authAxios.post(`${baseURL}/employees`, employee),
        update: async (id, employee) => await authAxios.put(`${baseURL}/employees/${id}`, employee),
        delete: async (id) => await authAxios.delete(`${baseURL}/employees/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/employees/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/employees/count`),
        all: async () => await authAxios.get(`${baseURL}/api/employees/all`)

    }
}
export function createFuelCompanyService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/fuelCompanies`),
        add: async (fuelCompany) => await authAxios.post(`${baseURL}/fuelCompanies`, fuelCompany),
        update: async (id, fuelCompany) => await authAxios.put(`${baseURL}/fuelCompanies/${id}`, fuelCompany),
        delete: async (id) => await authAxios.delete(`${baseURL}/fuelCompanies/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/fuelCompanies/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/fuelCompanies/count`),

    }
}
export function createFuelTypeService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/fuelTypes`),
        add: async (fuelType) => await authAxios.post(`${baseURL}/fuelTypes`, fuelType),
        update: async (id, fuelType) => await authAxios.put(`${baseURL}/fuelTypes/${id}`, fuelType),
        delete: async (id) => await authAxios.delete(`${baseURL}/fuelTypes/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/fuelTypes/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/fuelTypes/count`)

    }
}
export function createMissionOrderService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/missionOrders`),
        add: async (missionOrder) => await authAxios.post(`${baseURL}/missionOrders`, missionOrder),
        update: async (id, missionOrder) => await authAxios.put(`${baseURL}/missionOrders/${id}`, missionOrder),
        delete: async (id) => await authAxios.delete(`${baseURL}/missionOrders/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/missionOrders/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/missionOrders/count`),
        all: async () => await authAxios.get(`${baseURL}/api/missionOrders/all`)

    }
}

export function createOilChangeService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/oilChanges`),
        add: async (oilchange) => await authAxios.post(`${baseURL}/oilChanges`, oilchange),
        update: async (id, oilchange) => await authAxios.put(`${baseURL}/oilChanges/${id}`, oilchange),
        delete: async (id) => await authAxios.delete(`${baseURL}/oilChanges/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/oilChanges/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/oilChanges/count`),

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
        getAll: async () => await authAxios.get(`${baseURL}/reparationDetailses`),
        add: async (reparationdetails) => await authAxios.post(`${baseURL}/reparationDetailses`, reparationdetails),
        update: async (id, reparationdetails) => await authAxios.put(`${baseURL}/reparationDetailses/${id}`, reparationdetails),
        delete: async (id) => await authAxios.delete(`${baseURL}/reparationDetailses/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/reparationDetailses/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/reparationDetailses/count`),

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
        count: async () => await authAxios.get(`${baseURL}/api/vehicles/count`),
        all: async () => await authAxios.get(`${baseURL}/api/vehicles/all`)

    }
}

export function createVehicleStateService(authAxios) {
    return {
        getAll: async () => await authAxios.get(`${baseURL}/vehicleStates`),
        add: async (vehiclestate) => await authAxios.post(`${baseURL}/vehicleStates`, vehiclestate),
        update: async (id, vehiclestate) => await authAxios.put(`${baseURL}/vehicleStates/${id}`, vehiclestate),
        delete: async (id) => await authAxios.delete(`${baseURL}/vehicleStates/${id}`),
        get: async (id) => await authAxios.get(`${baseURL}/vehicleStates/${id}`),
        count: async () => await authAxios.get(`${baseURL}/api/vehicleStates/count`)

    }
}
