import React from "react";

const Obstacle = ({ ref, item }) => {
  return (
    <img
      className="obstacle"
      ref={ref}
      style={{ height: item.height }}
      src={item.item}
      alt="obstacle-item"
    />
  );
};

export default Obstacle;
