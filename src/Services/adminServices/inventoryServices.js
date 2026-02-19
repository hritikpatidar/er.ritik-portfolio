import httpServices from "./httpServices"

//category services
export const getCategoryListService= () => {
    return httpServices.get("/category-list")
}

export const addCategoryService= (payload) => {
    return httpServices.post("/add-category", payload)
}

export const updateCategoryService= (id,payload) => {
    return httpServices.patch(`/category-edit?category_id=${id}`,payload)
}

export const deleteCategoryService = (id)=>{
    return httpServices.delete(`/category-delete?category_id=${id}`)
}

export const enableDisableCategoryService = (payload)=>{
    return httpServices.post(`/category-disabled-enable`,payload)
}


//sub category services
export const getSubCategoryListService= (id) => {
    return httpServices.get(`/sub-category-list?category_id=${id}`)
}

export const addSubCategoryService= (payload) => {
    return httpServices.post("/add-sub-category", payload)
}

export const updateSubCategoryService= (id,payload) => {
    return httpServices.patch(`/sub-category-edit?sub_category_id=${id}`,payload)
}

export const deleteSubCategoryService = (id,payload)=>{
    return httpServices.delete(`/sub-category-delete?sub_category_id=${id}`)
}

export const enableDisableSubCategoryService = (payload)=>{
    return httpServices.post(`/sub-category-disabled-enable`,payload)
}

export const getUploadImageService = (payload)=>{
    return httpServices.post(`/upload-product-img`,payload)
}

export const addProductService=(payload)=>{
    return httpServices.post(`/add-product`,payload)
}

export const addUpdateService=(id,payload)=>{
    return httpServices.patch(`/product-edit?product_id=${id}`,payload)
}

//product list data
export const getProductListService= (payload) => {
    return httpServices.post(`/product-list`,payload)
}

export const deleteProductService = (id,payload)=>{
    return httpServices.delete(`/product-delete?product_id=${id}`)
}