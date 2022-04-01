import { useEffect } from "react";
// !! FIX ASSETS SIZE AND EXPORTS
import BikeOne from "./../../assets/bike/bike-0.png";
import BikeTwo from "./../../assets/bike/bike-1.png";
import BikeStop from "./../../assets/bike/bike-jump.png";
import BikeLoose from "./../../assets/bike/bike-crash.png";
import CarOne from "./../../assets/car/car-0.png";
import CarTwo from "./../../assets/car/car-1.png";
import CarStop from "./../../assets/car/car-jump.png";
import CarLoose from "./../../assets/car/car-crash.png";
import BeanCarOne from "./../../assets/beanCar/beanCar-0.png";
import BeanCarTwo from "./../../assets/beanCar/beanCar-1.png";
import BeanCarStop from "./../../assets/beanCar/beanCar-jump.png";
import BeanCarLoose from "./../../assets/beanCar/beanCar-crash.png";
import BusOne from "./../../assets/bus/bus-0.png";
import BusTwo from "./../../assets/bus/bus-1.png";
import BusStop from "./../../assets/bus/bus-jump.png";
import BusLoose from "./../../assets/bus/bus-crash.png";
import CycleOne from "./../../assets/cycle/cycle-0.png";
import CycleTwo from "./../../assets/cycle/cycle-1.png";
import CycleStop from "./../../assets/cycle/cycle-jump.png";
import CycleLoose from "./../../assets/cycle/cycle-crash.png";

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
  yVelocity = JUMP_SPEED;
  isJumping = true;
  return;
};

export const Vehicle = ({ frame, bottom, vehicleRef, currentVehicle }) => {
  const vehicles = [
    /*0*/ [BeanCarOne, BeanCarTwo, BeanCarStop, BeanCarLoose],
    /*1*/ [BikeOne, BikeTwo, BikeStop, BikeLoose],
    /*2*/ [BusOne, BusTwo, BusStop, BusLoose],
    /*3*/ [CarOne, CarTwo, CarStop, CarLoose],
    /*4*/ [CycleOne, CycleTwo, CycleStop, CycleLoose],
  ];

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
      src={vehicles[currentVehicle][frame]}
      alt="Vehicle"
      style={{
        bottom: `${bottom}%`,
        height: `${
          currentVehicle === 2 ? "15" : currentVehicle === 3 ? "12" : "16"
        }%`,
      }}
      ref={vehicleRef}
    />
  );
};
