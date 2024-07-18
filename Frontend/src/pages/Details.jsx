import React from "react";
import Carousel from "../components/Carousel";
import Navbar from "../components/Navbar";
import './details.css';

const images = [
  "https://swiperjs.com/demos/images/nature-1.jpg",
  "https://swiperjs.com/demos/images/nature-2.jpg",
  "https://swiperjs.com/demos/images/nature-3.jpg",
  "https://swiperjs.com/demos/images/nature-4.jpg",
  "https://swiperjs.com/demos/images/nature-5.jpg",
  "https://swiperjs.com/demos/images/nature-6.jpg",
  "https://swiperjs.com/demos/images/nature-7.jpg",
  "https://swiperjs.com/demos/images/nature-8.jpg",
  
];

function Details() {
  return (
    <div className="bg-base-100 text-white h-screen flex flex-col">
      <Navbar />
      <Carousel images={images} height="400px" />
      <div className=" bg-base-300 flex h-max p-2 m-4 mt-[-5px] rounded-3xl ">
        <div className="flex flex-col w-[50%] border-r-2 p-2">
          <span className=" text-2xl mb-1 ">TITLE</span>
          <span className="h-[25vh] overflow-y-scroll example ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            temporibus vel doloribus, id, eum quisquam consequuntur aliquam
            dolorem unde blanditiis laboriosam provident sed sit amet, impedit
            suscipit ullam aperiam. Obcaecati non sequi tenetur illum nihil
            excepturi rem dolores deserunt nesciunt voluptates, aut neque ea
            ratione dicta ut temporibus placeat. Natus ex cupiditate eligendi
            inventore repudiandae harum eius aperiam, sequi delenit quasi sint
            quis, asperiores exercitationem iste ipsa cumque hic velit! Autem a
            aperiam soluta quia ipsam impedit eius harum minus, hic alias nisi
            dicta, est, id cum porro rem maiores enim praesentium. Suscipit id
            tempore laboriosam magnam? Nesciunt, iusto neque.Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Quis temporibus vel
            doloribus, id, eum quisquam consequuntur aliquam dolorem unde
            blanditiis laboriosam provident sed sit amet, impedit suscipit ullam
            aperiam. Obcaecati non sequi tenetur illum nihil excepturi rem
            dolores deserunt nesciunt voluptates, aut neque ea ratione dicta ut
            temporibus placeat. Natus ex cupiditate eligendi inventore
            repudiandae harum eius aperiam, sequi deleniti quasi sint quis,
            asperiores exercitationem iste ipsa cumque hic velit! Autem a
            aperiam soluta quia ipsam impedit eius harum minus, hic alias nisi
            dicta, est, id cum porro rem maiores enim praesentium. Suscipit id
            tempore laboriosam magnam? Nesciunt, iusto neque.
          </span>
        </div>
        <div className="flex flex-col w-[50%]  p-2">
          <span className=" text-lg mb-1 ">Detail 1:</span>
          <span className=" text-lg mb-1 ">Detail 2:</span>
          <span className=" text-lg mb-1 ">Detail 3:</span>
          <label className="input input-bordered mt-2 input-sm input-accent ">
            <input type="number" className="grow" placeholder="Enter Donation Amount" />
          </label>
          <button className="btn btn-outline bg-slate-800 btn-accent mt-4">DONATE</button>
        </div>
      </div>
    </div>
  );
}

export default Details;
