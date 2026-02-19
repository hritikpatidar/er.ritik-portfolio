import httpServices from "./httpServices"


export const getDashboardCountService = () => {
    return httpServices.get("/dashboard")
}

export const getDashboardStockCountService = (payload) => {
    return httpServices.get(`/dashboard-stock?filter_key=${payload}`)
}

export const getRecentOrderServices = (payload) => {
    return httpServices.get(`/dashboard-recent-order?filter_key=${payload}`)
}

export const getIncomeListServices = (payload) => {
    return httpServices.get(`/dashboard-income?filter_key=${payload}`)
}
export const getTopFiveProductListServices = (payload) => {
    return httpServices.get(`/dashboard-top-five?filter_key=${payload}`)
}