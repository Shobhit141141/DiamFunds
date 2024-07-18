import React, { useState } from "react";

const Login = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://png.pngtree.com/background/20230616/original/pngtree-faceted-abstract-background-in-3d-with-shimmering-iridescent-metallic-texture-of-picture-image_3653595.jpg)",
      }}
    >
      <div className="hero bg-black bg-opacity-70 min-h-screen">
        <div className="hero-content  flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl text-white font-bold">Login now!</h1>
            <p className="py-6 text-white text-2xl">
              "Transforming startup dreams into reality with the strength of
              crowd funding and the security of Diamante Blockchain."
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your Username "
                  className="input input-bordered input-accent"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Secret Key</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your secret key"
                  className="input input-bordered input-accent "
                  required
                />
                <label className="label mt-2">
                  <a href="signup" className="label-text-alt link link-hover">
                    Don't have an account? Sign Up
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-accent">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
