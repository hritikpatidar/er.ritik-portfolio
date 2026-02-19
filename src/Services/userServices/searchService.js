import httpServices from "./httpServices";


export const getSerchService = (value) => {
  return httpServices.get(`/search?searchKey=${value}`);
};