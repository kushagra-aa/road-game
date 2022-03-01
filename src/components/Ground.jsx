import React, { useEffect } from "react";
import GroundItem from "./../assets/road/ground.png";

const Ground = () => {
  useEffect(() => {
    // setupGround();
  }, []);
  return (
    <div>
      {" "}
      <img src={GroundItem} alt="ground" data-ground />
    </div>
  );
};

export default Ground;
