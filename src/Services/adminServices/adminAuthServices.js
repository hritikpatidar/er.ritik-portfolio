import httpServices from "./httpServices"


export const loginService = (payload) => {
    return httpServices.post("/login", payload)
}

export const adminPasswordForgotService=(payload)=>{
    return httpServices.post("/forgot-password", payload)
}

export const getUserlistService = () => {
    return httpServices.get('/user-list')
}

export const adminOtpVerificationService =(payload)=>{
    return httpServices.post("/verify-otp", payload)
}

export const adminChangePasswordService =(payload)=>{
    return httpServices.post("/reset-password", payload)
}

export const getBlockUserlistService = () => {
    return httpServices.get('/block-user-list')
}

export const userBlockService =(payload) =>{
    return httpServices.post("/user-block-unblock", payload)
}
