import React from "react";

const Cactus = ({ ref, item }) => {
  return <img className="cactus" ref={ref} src={item} alt="cactus-item" />;
};

export default Cactus;
