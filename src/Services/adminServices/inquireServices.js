import httpServices from "./httpServices"

export const getInquireListService= (id) => {
    return httpServices.get(`/inquiry-list`)
}