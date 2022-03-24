import { useEffect } from "react";
// !! FIX ASSETS SIZE AND EXPORTS
import VehicleOne from "./../../assets/bike/bike-0.png";
import VehicleTwo from "./../../assets/bike/bike-1.png";
import VehicleStop from "./../../assets/bike/bike-jump.png";
import VehicleLoose from "./../../assets/bike/bike-crash.png";

const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const Vehicle_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let VehicleFrame;
let yVelocity;

export const updateVehicle = (
  delta,
  speedScale,
  setVehicleFrame,
  setVehicleBottom
) => {
  handleRun(delta, speedScale, setVehicleFrame);
  handleJump(delta, setVehicleBottom);
};

let currentFrameTime = 0;
let isJumping;
let bottom = 0;
const handleJump = (delta, setVehicleBottom) => {
  if (!isJumping) return;
  bottom = yVelocity * delta + bottom;
  setVehicleBottom(bottom);
  if (bottom <= 0) {
    setVehicleBottom(0);
    bottom = 0;
    isJumping = false;
  }
  yVelocity -= GRAVITY * delta;
  return;
};
const handleRun = (delta, speedScale, setVehicleFrame) => {
  if (isJumping) {
    setVehicleFrame(2);
    return;
  }
  if (currentFrameTime >= FRAME_TIME) {
    VehicleFrame = (VehicleFrame + 1) % Vehicle_FRAME_COUNT;
    setVehicleFrame(VehicleFrame);
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += delta * speedScale;
  return;
};
export const setVehicleLoose = (setVehicleFrame) => {
  setVehicleFrame(3);
};

export const onJump = (e) => {
  if (
    (e.code !== "Space" && e.code !== "ArrowUp" && e.code !== "Numpad8") ||
    isJumping
  )
    return;
  // jump here
  // JumpAudio.play();
  yVelocity = JUMP_SPEED;
  isJumping = true;
  return;
};

export const Vehicle = ({ frame, bottom, vehicleRef }) => {
  const vehicles = [VehicleOne, VehicleTwo, VehicleStop, VehicleLoose];

  useEffect(() => {
    isJumping = false;
    VehicleFrame = 0;
    currentFrameTime = 0;
    yVelocity = 0;

    document.addEventListener("keydown", onJump);
    return () => {
      document.removeEventListener("keydown", onJump);
    };
  }, []);

  return (
    <img
      className="vehicle"
      src={vehicles[frame]}
      alt="Vehicle-stationary"
      style={{ bottom: `${bottom}%` }}
      ref={vehicleRef}
    />
  );
};
