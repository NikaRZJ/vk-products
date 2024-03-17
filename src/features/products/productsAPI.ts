import axios from "axios";
import { urlAPI } from "../../utils/API";

export const fetchProducts = () => {
  return axios.get(`${urlAPI}?limit=10`);
};
