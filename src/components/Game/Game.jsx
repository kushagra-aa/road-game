import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Vehicle, onJump, setVehicleLoose, updateVehicle } from "./Vehicle.jsx";
import { Ground, updateGround } from "./Ground.jsx";
import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./../../helpers/updateProperty";
import CactusItem from "./../../assets/obstacles/cactus.png";
import HoleItem from "./../../assets/obstacles/hole.png";
import RoadBlock1Item from "./../../assets/obstacles/road-block-1.png";
import RoadBlock2Item from "./../../assets/obstacles/road-block-2.png";
import RoadBlock3Item from "./../../assets/obstacles/road-block-3.png";
import RoadBlock4Item from "./../../assets/obstacles/road-block-4.png";
import JumpIcon from "./../../assets/icons/Jump.png";
import Obstacle from "./Obstacle.jsx";

const Game = ({ setPage, score, setScore, highScore, setHighScore }) => {
  const [worldStyle, setWorldStyle] = useState();
  const [groundLeft, setGroundLeft] = useState([0, 300]);
  const [vehicleFrame, vetVehicleFrame] = useState(0);
  const [vehicleBottom, setvehicleBottom] = useState(0);
  const [cactuses, setCactuses] = useState([]);
  const [lost, setLost] = useState(false);

  const worldRef = useRef(null);
  const cactusRefs = useRef([]);
  const vehicleRef = useRef(null);

  const obstacles = [
    { item: CactusItem, height: "20%" },
    { item: RoadBlock3Item, height: "20%" },
    { item: HoleItem, height: "15%" },
    { item: RoadBlock2Item, height: "22%" },
    { item: RoadBlock1Item, height: "21%" },
    { item: RoadBlock4Item, height: "14%" },
  ];

  const WORLD_WIDTH = 100;
  const WORLD_HEIGHT = 42;
  const SPEED_SCALE_INCREASE = 0.00001;
  const SPEED = 0.05;
  const CACTUS_INTERVAL_MIN = 1000;
  const CACTUS_INTERVAL_MAX = 2000;

  let lastTime;
  let speedScale;
  let newScore = 0;
  let nextCactusTime = 0;
  let cactusRefsIndex = 0;

  const randomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getCactusRect = () => {
    let elm;
    // console.log("cactusRefs::>", cactusRefs);
    if (cactusRefs.current[0].current !== null)
      return cactusRefs.current.map((cactus) => {
        elm = ReactDOM.findDOMNode(cactus.current);
        // console.log("elm :>> ", elm);
        if (elm !== null) return elm.getBoundingClientRect();
        return {};
      });
    return [];
  };

  const handleLoose = () => {
    setVehicleLoose(vetVehicleFrame);
    setLost(true);
    setTimeout(() => setPage(3), 1000);
    newScore = 0;
  };

  const checkLoose = () => {
    const vehicleRect = vehicleRef.current.getBoundingClientRect();
    // console.log("vehicleRect", vehicleRect);
    return getCactusRect().some((rect) => isCollision(rect, vehicleRect));
  };

  const isCollision = (rect1, rect2) => {
    return (
      rect1.left < rect2.right &&
      rect1.top < rect2.bottom &&
      rect1.right > rect2.left &&
      rect1.bottom > rect2.top
    );
  };

  const createCactus = () => {
    cactusRefs.current.push(React.createRef());
    const cactus = Obstacle({
      ref: cactusRefs.current[cactusRefsIndex],
      item: obstacles[randomNumberBetween(obstacles.length, -1)],
    });
    // console.log(
    //   "randomNumberBetween(obstacles.length - 1, 0) :>> ",
    //   randomNumberBetween(obstacles.length, -1)
    // );
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
    window.requestAnimationFrame(update);
  };

  const update = (time) => {
    if (lastTime == null) {
      lastTime = time;
      window.requestAnimationFrame(update);
      return;
    }
    const delta = time - lastTime;
    setGroundLeft(updateGround(delta, speedScale));
    updateVehicle(delta, speedScale, vetVehicleFrame, setvehicleBottom);
    updateSpeedScale(delta);
    updateScore(delta);
    updateCactus(delta, speedScale);
    if (checkLoose()) return handleLoose();
    lastTime = time;
    window.requestAnimationFrame(update);
  };

  const updateSpeedScale = (delta) => {
    speedScale += delta * SPEED_SCALE_INCREASE;
  };

  const updateScore = (delta) => {
    newScore += delta * 0.01;
    setScore(Math.floor(newScore));
    if (newScore > Number(highScore)) setHighScore(Math.floor(newScore));
  };

  useEffect(() => {
    setPixleToWorldSacle();
    window.addEventListener("resize", setPixleToWorldSacle);
    handleStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("highScore", String(highScore));
  }, [highScore]);

  return (
    <>
      {lost && <h2 className="over-title game-over">game over</h2>}
      <div style={worldStyle} className="world" ref={worldRef}>
        <div className="score">
          Score:<span>{score}</span>
        </div>
        <div className="score high-score">
          Hi:<span>{highScore}</span>
        </div>
        <Vehicle
          frame={vehicleFrame}
          bottom={vehicleBottom}
          vehicleRef={vehicleRef}
        />
        <Ground left={groundLeft} />
        {cactuses && cactuses.map((cactus) => cactus)}
      </div>
      <button onClick={() => onJump({ code: "Space" })} className="jump-button">
        <img src={JumpIcon} alt="jump" />
      </button>
    </>
  );
};

export default Game;
