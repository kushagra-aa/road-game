import { useEffect, useState } from "react";
import DinoStopItem from "./../assets/dino/dino-stationary.png";

const Dino = () => {
  const [bottom, setBottom] = useState(0);
  return (
    <div>
      {" "}
      <img
        className="dino"
        src={DinoStopItem}
        alt="dino-stationary"
        styles={{ left: `${bottom}%` }}
      />
    </div>
  );
};

export default Dino;
