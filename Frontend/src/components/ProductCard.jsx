import React from 'react';

const ProductCard = ({ title, description, imageUrl }) => {
  return (
    <div className="card card-compact bg-slate-800 m-2 w-80 md:w-72 lg:w-80 shadow-xl flex flex-col">
      <figure className="overflow-hidden rounded-t-lg">
        <img
          className="object-cover w-full h-48 md:h-56 lg:h-48"
          src={imageUrl}
          alt={title}
        />
      </figure>
      <div className="card-body flex flex-col flex-1 p-4">
        <h2 className="card-title text-lg font-bold">{title}</h2>
        <div className="overflow-y-auto h-24">
          <p className="text-sm text-gray-300">{description}</p>
        </div>
        <div className="card-actions mt-4 flex justify-end">
          <button className="btn btn-primary">Fund Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
