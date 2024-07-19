import axios from "axios";
import { server_url } from "../config/api";

export const getAllFundraisers = async () => {
  const response = await axios.get(`${server_url}/funds/get-all`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

export const getSingleFund = async (id) => {
  const response = await axios.get(`${server_url}/funds/get/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};
