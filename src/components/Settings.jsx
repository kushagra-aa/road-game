import React, { useState } from "react";
import SettingsIcon from "./../assets/icons/Settings.png";
import CloseIcon from "./../assets/icons/close.png";
import ResetIcon from "./../assets/icons/reset.png";
import BeanCarIcon from "./../assets/beanCar/beanCar-0.png";
import CarIcon from "./../assets/car/car-0.png";
import BusIcon from "./../assets/bus/bus-0.png";
import BikeIcon from "./../assets/bike/bike-0.png";
import CycleIcon from "./../assets/cycle/cycle-0.png";
import CityIcon from "./../assets/bg/city.png";
import WestIcon from "./../assets/bg/west.png";
import FutureIcon from "./../assets/bg/future.png";
import WarzoneIcon from "./../assets/bg/warzone.png";
import CactusItem from "./../assets/obstacles/cactus.png";
import HoleItem from "./../assets/obstacles/hole.png";
import RoadBlock1Item from "./../assets/obstacles/road-block-1.png";
import RoadBlock2Item from "./../assets/obstacles/road-block-2.png";
import RoadBlock3Item from "./../assets/obstacles/road-block-3.png";
import RoadBlock4Item from "./../assets/obstacles/road-block-4.png";

const Settings = ({
  currentVehicle,
  setCurrentVehicle,
  currentDifficulty,
  setCurrentDifficulty,
  setCurrentLocation,
  currentLocation,
  includedObstacles,
  setIncludedObstacles,
  setHighScore,
  setScore,
}) => {
  const [isSetting, setIsSetting] = useState(false);

  const vehicles = [
    {
      id: 0,
      src: BeanCarIcon,
      name: "beanCar",
    },
    {
      id: 1,
      src: BikeIcon,
      name: "bike",
    },
    {
      id: 2,
      src: BusIcon,
      name: "bus",
    },
    {
      id: 3,
      src: CarIcon,
      name: "car",
    },
    {
      id: 4,
      src: CycleIcon,
      name: "cycle",
    },
  ];
  const locations = [
    {
      id: 0,
      src: CityIcon,
      name: "city",
    },
    {
      id: 1,
      src: WestIcon,
      name: "west",
    },
    {
      id: 2,
      src: WarzoneIcon,
      name: "warzone",
    },
    {
      id: 3,
      src: FutureIcon,
      name: "future",
    },
  ];
  const obstacles = [
    { id: 0, src: CactusItem, name: "cactus" },
    { id: 1, src: HoleItem, name: "hole" },
    { id: 2, src: RoadBlock1Item, name: "road block 1" },
    { id: 3, src: RoadBlock2Item, name: "road block 2" },
    { id: 4, src: RoadBlock3Item, name: "road block 3" },
    { id: 5, src: RoadBlock4Item, name: "road block 4" },
  ];
  const difficulties = [
    {
      id: 0,
      des: ["Slow Increase in speed", "Low Obstacles Density"],
      name: "ez mode",
    },
    {
      id: 1,
      des: ["Normal Increase in speed", "Normal Obstacles Density"],
      name: "chill mode",
    },
    {
      id: 2,
      des: ["High Increase in speed", "High Obstacles Density"],
      name: "tuff mode",
    },
  ];

  return (
    <>
      {!isSetting ? (
        <button className="settings-button" onClick={() => setIsSetting(true)}>
          <img src={SettingsIcon} alt="settings button" />
        </button>
      ) : (
        <div className="settings-container">
          <div className="settings-row">
            <div className="settings-row-top">
              <h5>vehicles</h5>
              <button
                className="setting-btn"
                onClick={() => setIsSetting(false)}
              >
                <img src={CloseIcon} alt="close button" />
              </button>
            </div>
            <div className="settings-row-cards">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={`settings-row-card ${
                    vehicle.id === currentVehicle && "setting-current"
                  }`}
                  onClick={() => setCurrentVehicle(vehicle.id)}
                >
                  <img src={vehicle.src} alt={vehicle.name} />
                </div>
              ))}
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-top">
              <h5>difficulties</h5>
            </div>
            <div className="settings-row-cards">
              {difficulties.map((difficulty) => (
                <div
                  key={difficulty.id}
                  className={`settings-row-card ${
                    difficulty.id === currentDifficulty && "setting-current"
                  }`}
                  onClick={() => setCurrentDifficulty(difficulty.id)}
                >
                  <h6>{difficulty.name}</h6>
                  <ul>
                    {difficulty.des.map((d) => (
                      <li>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-top">
              <h5>locations</h5>
            </div>
            <div className="settings-row-cards">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className={`settings-row-card ${
                    location.id === currentLocation && "setting-current"
                  }`}
                  onClick={() => setCurrentLocation(location.id)}
                >
                  <h6>{location.name}</h6>
                  <img src={location.src} alt={location.name} />
                </div>
              ))}
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-top">
              <h5>obstacles</h5>
            </div>
            <div className="settings-row-cards">
              {obstacles.map((obstacle) => (
                <div
                  key={obstacle.id}
                  className={`settings-row-card settings-small-img ${
                    includedObstacles.includes(obstacle.id) && "setting-current"
                  } ${
                    includedObstacles.includes(obstacle.id) &&
                    includedObstacles.length <= 1
                      ? "setting-disabled"
                      : "set"
                  }`}
                  onClick={() => {
                    if (
                      includedObstacles.includes(obstacle.id) &&
                      includedObstacles.length <= 1
                    )
                      return;
                    if (includedObstacles.includes(obstacle.id)) {
                      setIncludedObstacles(
                        includedObstacles.filter((io) => io !== obstacle.id)
                      );
                      return;
                    }
                    setIncludedObstacles([...includedObstacles, obstacle.id]);
                  }}
                >
                  <img src={obstacle.src} alt={obstacle.name} />
                </div>
              ))}
            </div>
          </div>
          <div className="settings-row settings-last">
            <div className="settings-row-top">{""}</div>
            <div className="settings-row-cards">
              <button
                className="setting-btn"
                onClick={() => {
                  setHighScore(0);
                  setScore(0);
                  localStorage.setItem("highScore", "0");
                }}
              >
                <img src={ResetIcon} alt="reset button" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
