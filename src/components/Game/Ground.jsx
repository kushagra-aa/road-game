import { useEffect, useState } from "react";

const SPEED = 0.05;
let newLeft = [0, 300];

export const updateGround = async (delta, speedScale, left) => {
  newLeft.forEach((el, i) => {
    newLeft[i] = newLeft[i] + delta * speedScale * SPEED * -1;
    if (newLeft[i] <= -300) {
      newLeft[i] += 600;
    }
  });
  return newLeft;
};

export const Ground = ({ left, location }) => {
  const [ground1Style, setGround1Style] = useState();
  const [ground2Style, setGround2Style] = useState();

  useEffect(() => {
    if (newLeft) {
      setGround1Style({
        left: `${newLeft[0]}%`,
      });
      setGround2Style({
        left: `${newLeft[1]}%`,
      });
    }
  }, [left]);

  return (
    <>
      <img
        className="ground"
        style={ground1Style}
        src={location}
        alt="ground"
      />
      <img
        className="ground"
        style={ground2Style}
        src={location}
        alt="ground"
      />
    </>
  );
};
