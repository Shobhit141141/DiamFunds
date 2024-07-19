import React, { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import Navbar from "../components/Navbar";
import { getSingleFund } from "../apis/fundApi";
import { toast } from "react-hot-toast";
import "./details.css";
import { useParams } from "react-router-dom";
import { donateToFund } from "../apis/userApi";

function Details() {
  const [fund, setFund] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const { id } = useParams();

  const fetchFund = async () => {
    try {
      const response = await getSingleFund(id);
      setFund(response.data.result);
      console.log(response.data.result);

    } catch (error) {
      console.error("Error fetching fund:", error);
    }
  };

  useEffect(() => {
    fetchFund();
  }, [id]);

  const handleDonationChange = (e) => {
    setDonationAmount(e.target.value);
  };

  const handleDonateClick = async () => {
    if (!donationAmount || donationAmount <= 0) {
      toast.error("Please enter a valid donation amount.");
      return;
    }

    try {
      const response = await donateToFund(id, donationAmount);
      toast.success(response.data.message);
      setDonationAmount("");
      const updatedResponse = await getSingleFund(id);
      setFund(updatedResponse.data.result);
    } catch (error) {
      toast.error("Error donating to fund.");
      console.error("Error donating to fund:", error);
    }
  };

  if (!fund) return <div>Loading...</div>;

  
  const sortedDonators = [...fund.donators].sort((a, b) => b.amount - a.amount);

  return (
    <div className="bg-base-100 text-white h-screen flex flex-col">
      <Navbar />
      <Carousel images={fund.images} height="400px" />
      <div className="bg-base-300 flex h-max p-2 m-4 mt-[-5px] rounded-3xl">
        <div className="flex flex-col w-[50%] border-r-2 p-2">
          <span className="text-2xl mb-1">{fund.title}</span>
          <span className="h-[25vh] overflow-y-scroll example">
            {fund.description}
          </span>
          <span className="text-lg mt-4">Creation Date: {new Date(fund.listed_at).toLocaleString()}</span>
        </div>
        <div className="flex flex-col w-[50%] p-2">
          <span className="text-lg mb-1">Creator: {fund.fundraiserId.username}</span>
          <span className="text-lg mb-1">Total Amount: {fund.totalFundAsked}</span>
          <span className="text-lg mb-1">Total Fund Collected: {fund.totalFundGot}</span>
          {fund.totalFundGot > fund.totalFundAsked ? (
            ""
          ) : (
            <span className="text-lg mb-1">
              Total Fund Left: {fund.totalFundAsked - fund.totalFundGot}
            </span>
          )}
          <span className={`badge ${fund.done ? "badge-success" : "badge-warning"}`}>
            {fund.done ? "Successful" : "Pending"}
          </span>
          <label className="input input-bordered mt-2 input-sm input-accent">
            <input
              type="number"
              className="grow"
              placeholder="Enter Donation Amount"
              value={donationAmount}
              onChange={handleDonationChange}
            />
          </label>
          <button
            className="btn btn-outline bg-slate-800 btn-accent mt-4"
            onClick={handleDonateClick}
          >
            DONATE
          </button>
        </div>
      </div>

      {/* Donators Table */}
      <div className="bg-base-300 p-4 m-4 rounded-3xl">
        <h2 className="text-2xl mb-4">Donators</h2>
        <table className="table-auto w-full zebra">
          <thead>
            <tr className="">
              <th className="p-2">Index</th>
              <th className="p-2">Username</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Donation Date</th>
            </tr>
          </thead>
          <tbody>
            {sortedDonators.map((donator, index) => (
              <tr
                key={index}
                className={`text-center ${index < 3 ? "text-yellow-400 font-bold" : ""}`} // Highlight top 3 donators
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{donator.donorId.username}</td>
                <td className="p-2">{donator.amount}</td>
                <td className="p-2">{new Date(donator.donated_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Details;
