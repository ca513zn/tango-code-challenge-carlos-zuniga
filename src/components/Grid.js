import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { arrayToHash, transformHash } from "../utils";
import Loader from "./Loader";

const Grid = ({ data, updateSpeed }) => {
  const { m, n, state } = data;

  const [animate, setAnimate] = useState(false);
  const [hash, setHash] = useState({});

  useEffect(() => {
    const arrToHash = arrayToHash(state);
    setHash(arrToHash);
  }, [state]);

  let rows = Array(m).fill(0);
  let cols = Array(n).fill(0);

  const handleAnimation = () => {
    setAnimate(!animate);
  };

  const toggleAnimation = () => {
    const newHash = transformHash(m, n, hash);
    setHash(newHash);
  };

  useEffect(() => {
    let timer;
    if (animate) {
      timer = setTimeout(() => toggleAnimation(), updateSpeed);
    } else {
      clearTimeout(timer);
    }
  });

  return (
    <>
      <div className="grid">
        <div className="grid grid__container">
          {Object.keys(hash).length > 0 ? (
            <>
              {rows.map((row, ri) => {
                return (
                  <div className="grid__row" key={"row" + ri}>
                    {cols.map((column, ci) => {
                      const val = hash[`${ri}-${ci}`];
                      return (
                        <div
                          className={`grid__cell grid__cell--${val}`}
                          key={`${ri}-${ci}`}
                        >
                          {" "}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </>
          ) : (
            <Loader />
          )}
        </div>
        <button className="btn" onClick={handleAnimation}>
          {animate ? "Pause" : "Start"}
        </button>
        <div className="watermark">
          Tango Coding Challenge - Candidate: Carlos Zuniga, 2020.
        </div>
      </div>
    </>
  );
};

Grid.propTypes = {
  data: PropTypes.object,
  updateSpeed: PropTypes.number,
};

export default Grid;
