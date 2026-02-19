import httpServices from "./httpServices"

export const selectedAddressService = (payload) => {
    return httpServices.post("/add-shipping-address",payload)
}

export const paymentProcessService = (payload) => {
    return httpServices.post("/phonepe-payment",payload)
}
