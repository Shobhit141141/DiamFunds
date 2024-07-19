import axios from "axios";
import { server_url } from "../config/api";

export const listFund = async (formData) => {
  const response = await axios.post(
    `${server_url}/user/list-fund-raiser`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  return response;
};

export const getUserDetails = async () => {
	const response = await axios.get(`${server_url}/user/details`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('access_token')}`,
		},
	});
	return response;
};

export const getDiamAccountTransactions = async () => {
	try {
		const resp = await axios.get(
			`https://diamtestnet.diamcircle.io/accounts/${public_address}/transactions`
		);
		return resp.data;
	} catch (error) {
		console.log('Error fetching transactions: ', error);
		toast.error('Error fetching transactions');
	}
};
