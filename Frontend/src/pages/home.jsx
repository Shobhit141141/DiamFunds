import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getAllFundraisers } from "../apis/fundApi";
import { Link } from "react-router-dom";

function Home({setProgress}) {
  const [fundraiser, setFundaraiser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setProgress(30)
      try {
        const response = await getAllFundraisers();
        setFundaraiser(response.data.result);
        console.log(fundraiser);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setProgress(100)
      }
    };

    fetchData();
  }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="text-white bg-base-100 h-screen">
      <Navbar/>
      <div className="flex justify-center items-center">
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
