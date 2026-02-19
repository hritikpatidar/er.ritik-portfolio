import httpServices from "./httpServices"

export const signupService = (payload) => {
    return httpServices.post("/signup", payload)
}

export const optVerificationService = (payload) => {
    return httpServices.post("/otp-verify", payload)
}

export const loginServices = (payload) => {
    return httpServices.post("/login", payload)
}

export const supportAndContectUSService =(payload)=>{
    return httpServices.post("/add-inquiry",payload)
}
