import React, { useEffect, useState } from "react";
import { Dino, updateDino } from "./Dino.jsx";
import { Ground, updateGround } from "./Ground.jsx";

const Main = () => {
  const [gameStart, setGameStart] = useState(false);
  const [score, setScore] = useState(0);
  const [worldStyle, setWorldStyle] = useState();
  const [groundLeft, setGroundLeft] = useState([0, 300]);
  const [dinoFrame, setDinoFrame] = useState(0);
  const [dinoBottom, setDinoBottom] = useState(0);

  const WORLD_WIDTH = 100;
  const WORLD_HEIGHT = 30;
  const SPEED_SCALE_INCREASE = 0.00001;

  let lastTime;
  let speedScale;
  let newScore = 0;

  const setPixleToWorldSacle = () => {
    let worldToPixleScale;
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
      worldToPixleScale = window.innerWidth / WORLD_WIDTH;
    } else {
      worldToPixleScale = window.innerHeight / WORLD_HEIGHT;
    }
    setWorldStyle({
      height: `${WORLD_HEIGHT * worldToPixleScale}px`,
      width: `${WORLD_WIDTH * worldToPixleScale}px`,
    });
  };

  const handleStart = () => {
    lastTime = null;
    speedScale = 1;
    setGameStart(true);
    window.requestAnimationFrame(update);
  };

  const update = async (time) => {
    if (lastTime == null) {
      lastTime = time;
      window.requestAnimationFrame(update);
      return;
    }
    const delta = time - lastTime;
    setGroundLeft(updateGround(delta, speedScale));
    updateDino(delta, speedScale, setDinoFrame, setDinoBottom);
    updateSpeedScale(delta);
    updateScore(delta);
    lastTime = time;
    window.requestAnimationFrame(update);
  };

  const updateSpeedScale = (delta) => {
    speedScale += delta * SPEED_SCALE_INCREASE;
  };

  const updateScore = (delta) => {
    newScore += delta * 0.01;
    setScore(Math.floor(newScore));
  };

  useEffect(() => {
    setPixleToWorldSacle();
    window.addEventListener("resize", setPixleToWorldSacle);
    document.addEventListener("keydown", handleStart, { once: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      setGameStart(false);
      setScore(0);
    };
  }, []);

  return (
    <>
      {!gameStart && <div className="start-screen">press any key to start</div>}
      <div style={worldStyle} className="world" data-world>
        <div className="score">{score}</div>
        <Dino frame={dinoFrame} bottom={dinoBottom} />
        <Ground left={groundLeft} />
      </div>
    </>
  );
};

export default Main;
