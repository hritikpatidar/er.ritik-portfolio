import httpServices from './httpServices'

export const getOrderListService =()=>{
    return httpServices.get("/order-list")
}

export const AcceptRejectOrderService =(payload)=>{
    return httpServices.post("/order-accept-reject",payload)
}

export const updateOrderStatusService =(payload)=>{
    return httpServices.post("/order-edit",payload)
}

export const sendTrackingIdService =(payload)=>{
    return httpServices.post("/add-traking-id",payload)
}