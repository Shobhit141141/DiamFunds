import React, { useState } from "react";
import { listFund } from "../apis/userApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const ListFund = ({ setProgress }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    totalFundAsked: "",
    images: [],
  });

  const [responseMessage, setResponseMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      handleFileUpload(files);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileUpload = (files) => {
    const imageFiles = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageFiles.push(reader.result);
        if (imageFiles.length === files.length) {
          setFormData((prevState) => ({
            ...prevState,
            images: [...prevState.images, ...imageFiles],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setProgress(50);
      const response = await listFund(formData);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      setProgress(100);
      toast.error(error.response ? error.response.data.error : error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-[#1D232A] flex justify-center overflow-hidden py-4">
        <div className="mx-auto p-4 rounded-xl bg-gray-900 text-white w-[80%] md:w-[50%]">
          <h1 className="text-2xl font-bold mb-4">
            List a Fund Raiser 💰 for your NGO!
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[30px] p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="totalFundAsked"
                className="block text-sm font-medium"
              >
                Total Fund Asked (in Diams)
              </label>
              <input
                type="number"
                id="totalFundAsked"
                name="totalFundAsked"
                value={formData.totalFundAsked}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[30px] p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="images" className="block text-sm font-medium">
                Images
              </label>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
                onChange={handleChange}
                className="mt-1 block text-sm text-gray-400 bg-gray-800 border-gray-700 rounded-md shadow-sm cursor-pointer w-[50%]"
              />
              {formData.images.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2 items-center justify-start w-[100%] ">
                  {formData.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Preview ${index}`}
                      className="w-28 h-28 object-cover mt-2 rounded-md border border-gray-700"
                    />
                  ))}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
          {responseMessage && <p className="mt-4 text-lg">{responseMessage}</p>}
        </div>
      </div>
    </>
  );
};

export default ListFund;
