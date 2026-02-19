import httpServices from "./httpServices";


export const giveRatingServices = (payload) => {
  return httpServices.post(`add-product-rating`,payload);
};