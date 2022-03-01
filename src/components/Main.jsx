import React, { useEffect, useState } from "react";
import Dino from "./Dino.jsx";
import Ground from "./Ground.jsx";

const Main = () => {
  const [gameStart, setGameStart] = useState(false);
  const [score, setScore] = useState(0);

  return (
    <>
      <div className="world" data-world>
        <div className="score">{score}</div>
        {!gameStart && (
          <div className="start-screen">press any key to start</div>
        )}
        <Dino />
        <Ground />
      </div>
    </>
  );
};

export default Main;
