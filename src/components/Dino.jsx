import { useEffect, useState } from "react";
import DinoOne from "./../assets/dino/dino-run-0.png";
import DinoTwo from "./../assets/dino/dino-run-1.png";
import DinoStop from "./../assets/dino/dino-stationary.png";

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

const onJump = (e) => {
  if (e.code !== "Space" || isJumping) return;
  yVelocity = JUMP_SPEED;
  isJumping = true;
  return;
};

export const Dino = ({ frame, bottom }) => {
  const dinos = [DinoOne, DinoTwo, DinoStop];

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
      data-dino
    />
  );
};
