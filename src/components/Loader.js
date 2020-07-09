import React from "react";

const Loader = () => {
  return (
    <>
      <div className="flexbox">
        <div>
          <div className="mesh-loader">
            <div className="set-one">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            <div className="set-two">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="loading-text">Loading data...</div>
    </>
  );
};

export default Loader;
