import httpServices from "./httpServices";


export const getWishlistListService = () => {
  return httpServices.get("/wish-list");
};

export const getAddWishlistService = (id) => {
  return httpServices.get(`/add-wish-list?product_id=${id}`);
};