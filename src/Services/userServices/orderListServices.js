import httpServices from "./httpServices"

export const getOrderListService = () => {
    return httpServices.get("/order-list")
}