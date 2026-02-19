import httpServices from "./httpServices"

export const getUserProfileService = () => {
    return httpServices.get("/profile")
}

export const UserProfileUpdateService =(payload)=>{
    return httpServices.patch("/profile-edit",payload)
}

export const addAddressService =(payload)=>{
    return httpServices.post("/add-address",payload)
}