import React, { useState } from "react";
import Game from "./Game/Game";
import Home from "./Home/Home";
import Over from "./Over/Over";
import Settings from "./Settings";

const Main = () => {
  const [page, setPage] = useState(1);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(localStorage.getItem("highScore"));
  const [vehicle, setVehicle] = useState(1);
  const [difficulty, setDifficulty] = useState(0);
  const [location, setLocation] = useState(0);
  const [obstacles, setObstacles] = useState([1, 2, 3, 4, 5]);

  const doStart = (e) => {
    if (e.code !== "Space" && e.code !== "ArrowUp" && e.code !== "Numpad8") {
      document.removeEventListener("keydown", doStart);
      document.addEventListener("keydown", doStart, { once: true });
      return;
    }
    setPage(2);
    setScore(0);
  };

  return (
    <div className="container">
      {page === 1 ? (
        <>
          <Home
            highScore={highScore}
            score={score}
            doStart={doStart}
            setPage={setPage}
          />
          <Settings
            currentDifficulty={difficulty}
            setCurrentDifficulty={setDifficulty}
            currentVehicle={vehicle}
            setCurrentVehicle={setVehicle}
            setCurrentLocation={setLocation}
            currentLocation={location}
            includedObstacles={obstacles}
            setIncludedObstacles={setObstacles}
            setHighScore={setHighScore}
            setScore={setScore}
          />
        </>
      ) : page === 2 ? (
        <Game
          highScore={highScore}
          score={score}
          setScore={setScore}
          setHighScore={setHighScore}
          setPage={setPage}
          currentVehicle={vehicle}
          currentDifficulty={difficulty}
          currentLocation={location}
          includedObstacles={obstacles}
        />
      ) : (
        <>
          <Over
            highScore={highScore}
            score={score}
            doStart={doStart}
            setPage={setPage}
          />
          <Settings
            currentDifficulty={difficulty}
            setCurrentDifficulty={setDifficulty}
            currentVehicle={vehicle}
            setCurrentVehicle={setVehicle}
            setCurrentLocation={setLocation}
            currentLocation={location}
            includedObstacles={obstacles}
            setIncludedObstacles={setObstacles}
            setHighScore={setHighScore}
            setScore={setScore}
          />
        </>
      )}
    </div>
  );
};

export default Main;
