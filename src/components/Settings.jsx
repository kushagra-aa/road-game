import React, { useState } from "react";
import SettingsIcon from "./../assets/icons/Settings.png";
import CloseIcon from "./../assets/icons/close.png";
import MusicIcon from "./../assets/icons/music.png";
import AudioIcon from "./../assets/icons/audio.png";
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

const Settings = ({}) => {
  const [isSetting, setIsSetting] = useState(false);

  const vehicles = [
    {
      src: BeanCarIcon,
      name: "beanCar",
    },
    {
      src: BikeIcon,
      name: "bike",
    },
    {
      src: BusIcon,
      name: "bus",
    },
    {
      src: CarIcon,
      name: "car",
    },
    {
      src: CycleIcon,
      name: "cycle",
    },
  ];
  const locations = [
    {
      src: CityIcon,
      name: "city",
    },
    {
      src: WestIcon,
      name: "west",
    },
    {
      src: WarzoneIcon,
      name: "warzone",
    },
    {
      src: FutureIcon,
      name: "future",
    },
  ];
  const obstacles = [
    { src: CactusItem, name: "cactus" },
    { src: HoleItem, name: "hole" },
    { src: RoadBlock1Item, name: "road block 1" },
    { src: RoadBlock2Item, name: "road block 2" },
    { src: RoadBlock3Item, name: "road block 3" },
    { src: RoadBlock4Item, name: "road block 4" },
  ];
  const difficulties = [
    {
      des: ["Slow Increase in speed", "Low Obstacles Density"],
      name: "ez mode",
    },
    {
      des: ["Normal Increase in speed", "Normal Obstacles Density"],
      name: "chill mode",
    },
    {
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
                <div key={vehicle.name} className="settings-row-card">
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
                <div key={difficulty.name} className="settings-row-card">
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
                <div key={location.name} className="settings-row-card">
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
                  key={obstacle.name}
                  className="settings-row-card settings-small-img"
                >
                  <img src={obstacle.src} alt={obstacle.name} />
                </div>
              ))}
            </div>
            <div className="settings-row">
              <div className="settings-row-top">{""}</div>
              <div className="settings-row-cards">
                <button
                  className="setting-btn"
                  onClick={() => setIsSetting(false)}
                >
                  <img src={MusicIcon} alt="close button" />
                </button>
                <button
                  className="setting-btn"
                  onClick={() => setIsSetting(false)}
                >
                  <img src={AudioIcon} alt="close button" />
                </button>
                <button
                  className="setting-btn"
                  onClick={() => setIsSetting(false)}
                >
                  <img src={ResetIcon} alt="close button" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
