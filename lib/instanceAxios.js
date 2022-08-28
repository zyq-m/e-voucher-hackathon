import axios from "axios";

const instanceAxios = axios.create({
  baseURL: "https://e-voucher-api.herokuapp.com/" || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instanceAxios;
