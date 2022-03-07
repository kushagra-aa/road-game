import { useEffect, useState } from "react";
import DinoStopItem from "./../assets/dino/dino-stationary.png";

export const Dino = () => {
  const [bottom, setBottom] = useState(0);
  return (
    <img
      className="dino"
      src={DinoStopItem}
      alt="dino-stationary"
      style={{ bottom: `${bottom}%` }}
    />
  );
};
