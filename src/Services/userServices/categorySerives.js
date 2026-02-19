import httpServices from "./httpServices"

export const getCategoriesListService = () => {
    return httpServices.get("/category-list")
}

export const getUserSubCategoryListService = (id) => {
    return httpServices.get(`/sub-category-list?category_id=${id}`)
}

export const getProductListService=(payload)=>{
    return httpServices.post(`/product-list`,payload)
}

export const getProductDataService=(id)=>{
    return httpServices.get(`/product-view?product_id=${id}`)
}

export const addToProductService=(payload)=>{
    return httpServices.post(`/add-cart`,payload)
}

export const getAddToCardList=()=>{
    return httpServices.get(`/cart-list`)
}

export const deleteCartService =(payload)=>{
    return httpServices.post(`/cart-delete`,payload)
}

export const checkoutService =(payload)=>{
    return httpServices.post(`/cart-check-out`,payload)
}

//get New arrival product list service
export const getNewArrivalProductListService =(payload)=>{
    return httpServices.get(`/home-products?filter=${payload}`)
}
//Recommended product list service
export const getRecommendedProductListService =()=>{
    return httpServices.get(`/recommended-products`)
}

export const addRecommendedProduct =(id)=>{
    return httpServices.get(`/add-recommended?product_id=${id}`)
}
