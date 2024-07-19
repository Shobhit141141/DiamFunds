import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getAllFundraisers } from "../apis/fundApi";
import { Link, useNavigate } from "react-router-dom";

function Home({setProgress}) {
  const [fundraiser, setFundaraiser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('access_token') === null) {
      navigate('/login');
      return;
    }
    const fetchData = async () => {
      setProgress(60)
      try {
        const response = await getAllFundraisers();
        setFundaraiser(response.data.result);
      } catch (err) {
        console.error(err);
      } finally {
        setProgress(100)
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white bg-base-100 h-screen">
      <Navbar/>
      <div className="flex justify-center items-center mt-7">
        <div className="flex flex-wrap w-[93vw] items-center justify-center ml-1 p-1">
          {fundraiser.length > 0 ? (
            fundraiser.map((fundraiser) => (
              <Link to={`/details/${fundraiser._id}`}>
                <ProductCard
                  key={fundraiser._id}
                  title={fundraiser.title}
                  description={fundraiser.description}
                  imageUrl={fundraiser.images[0]}
                />
              </Link>
            ))
          ) : (
            <div>No fund Raisers available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
