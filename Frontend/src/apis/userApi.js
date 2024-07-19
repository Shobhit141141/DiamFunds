import axios from "axios";
import { server_url } from "../config/api";

export const listFund = async (formData) => {
  const response = await axios.post(
    `${server_url}/user/list-fund-raiser`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
};

export const donateToFund = async (fundId, amount) => {
  const response = await axios.post(
    `${server_url}/user/donate/${fundId}`,
    { amount },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
};
