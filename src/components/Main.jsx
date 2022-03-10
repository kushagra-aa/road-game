import React, { useEffect, useRef, useState } from "react";
import { Dino, updateDino } from "./Dino.jsx";
import { Ground, updateGround } from "./Ground.jsx";
import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./../helpers/updateProperty";
import CactusItem from "./../assets/obstacles/cactus.png";
import Cactus from "./Cactus.jsx";

const Main = () => {
  const [gameStart, setGameStart] = useState(false);
  const [score, setScore] = useState(0);
  const [worldStyle, setWorldStyle] = useState();
  const [groundLeft, setGroundLeft] = useState([0, 300]);
  const [dinoFrame, setDinoFrame] = useState(2);
  const [dinoBottom, setDinoBottom] = useState(0);
  const [cactuses, setCactuses] = useState([]);

  const worldRef = useRef(null);
  const cactusRefs = useRef([]);

  const WORLD_WIDTH = 100;
  const WORLD_HEIGHT = 30;
  const SPEED_SCALE_INCREASE = 0.00001;
  const SPEED = 0.05;
  const CACTUS_INTERVAL_MIN = 500;
  const CACTUS_INTERVAL_MAX = 2000;

  let lastTime;
  let speedScale;
  let newScore = 0;
  let nextCactusTime = 0;
  let cactusRefsIndex = 0;

  const randomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const createCactus = () => {
    cactusRefs.current.push(React.createRef());
    const cactus = Cactus({
      ref: cactusRefs.current[cactusRefsIndex],
      item: CactusItem,
    });
    let newCactusArray = cactuses;
    // const cactus = document.createElement("img");
    // cactus.ref = cactusRefs.current[cactusRefsIndex];
    // cactus.src = CactusItem;
    // cactus.classList.add("cactus");
    // console.log("cactus :>> ", cactus);
    // console.log("cactusRefs :>> ", cactusRefs);
    // console.log("worldRef", worldRef);
    newCactusArray.push(cactus);
    // console.log("newCactusArray", newCactusArray);
    setCactuses(newCactusArray);
    // worldRef.current.appendChild(cactus);
    cactusRefsIndex++;
    // setCustomProperty(
    //   cactusRefs.current.find((c) => c === cactus),
    //   "--left",
    //   100
    // );
  };

  const setupCactus = () => {
    if (cactusRefs.current[0] !== 0)
      cactusRefs.current.map((cactus) => cactus.current.remove());
  };

  const updateCactus = (delta, speedScale) => {
    if (cactusRefs.current[0] !== 0)
      cactusRefs.current.forEach((cactus) => {
        incrementCustomProperty(
          cactus.current,
          "--left",
          delta * speedScale * SPEED * -1
        );
        if (getCustomProperty(cactus.current, "--left") <= -100) {
          cactus.current.remove();
        }
      });
    if (nextCactusTime <= 0) {
      // console.log("cactusRefs :>> ", cactusRefs);
      createCactus();
      cactusRefs.current.forEach((cactus) => {
        // setCustomProperty(cactus.current, "--left", 100);
      });
      nextCactusTime =
        randomNumberBetween(CACTUS_INTERVAL_MAX, CACTUS_INTERVAL_MIN) /
        speedScale;
    }
    nextCactusTime -= delta;
  };

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
    setupCactus();
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
    updateCactus(delta, speedScale);
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
      <div style={worldStyle} className="world" ref={worldRef}>
        <div className="score">{score}</div>
        <Dino frame={dinoFrame} bottom={dinoBottom} />
        <Ground left={groundLeft} />
        {cactuses && cactuses.map((cactus) => cactus)}
      </div>
    </>
  );
};

export default Main;
