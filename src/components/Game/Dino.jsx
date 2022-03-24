import { useEffect } from "react";
// !! FIX ASSETS SIZE AND EXPORTS
import DinoOne from "./../../assets/bike/bike-0.png";
import DinoTwo from "./../../assets/bike/bike-1.png";
import DinoStop from "./../../assets/bike/bike-jump.png";
import DinoLoose from "./../../assets/bike/bike-crash.png";

const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let dinoFrame;
let yVelocity;

export const updateDino = (delta, speedScale, setDinoFrame, setDinoBottom) => {
  handleRun(delta, speedScale, setDinoFrame);
  handleJump(delta, setDinoBottom);
};

let currentFrameTime = 0;
let isJumping;
let bottom = 0;
const handleJump = (delta, setDinoBottom) => {
  if (!isJumping) return;
  bottom = yVelocity * delta + bottom;
  setDinoBottom(bottom);
  if (bottom <= 0) {
    setDinoBottom(0);
    bottom = 0;
    isJumping = false;
  }
  yVelocity -= GRAVITY * delta;
  return;
};
const handleRun = (delta, speedScale, setDinoFrame) => {
  if (isJumping) {
    setDinoFrame(2);
    return;
  }
  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    setDinoFrame(dinoFrame);
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += delta * speedScale;
  return;
};
export const setDinoLoose = (setDinoFrame) => {
  setDinoFrame(3);
};

export const onJump = (e) => {
  if (
    (e.code !== "Space" && e.code !== "ArrowUp" && e.code !== "Numpad8") ||
    isJumping
  )
    return;
  yVelocity = JUMP_SPEED;
  isJumping = true;
  return;
};

export const Dino = ({ frame, bottom, dinoRef }) => {
  const dinos = [DinoOne, DinoTwo, DinoStop, DinoLoose];

  useEffect(() => {
    isJumping = false;
    dinoFrame = 0;
    currentFrameTime = 0;
    yVelocity = 0;

    document.addEventListener("keydown", onJump);
    return () => {
      document.removeEventListener("keydown", onJump);
    };
  }, []);

  return (
    <img
      className="dino"
      src={dinos[frame]}
      alt="dino-stationary"
      style={{ bottom: `${bottom}%` }}
      ref={dinoRef}
    />
  );
};
