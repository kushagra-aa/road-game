import React, { useState } from "react";
import Game from "./Game/Game";
import Home from "./Home/Home";
import Over from "./Over/Over";
import Settings from "./Settings";

const Main = () => {
  const [page, setPage] = useState(1);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(localStorage.getItem("highScore"));

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
          <Settings />
        </>
      ) : page === 2 ? (
        <Game
          highScore={highScore}
          score={score}
          setScore={setScore}
          setHighScore={setHighScore}
          setPage={setPage}
        />
      ) : (
        <>
          <Over
            highScore={highScore}
            score={score}
            doStart={doStart}
            setPage={setPage}
          />
          <Settings />
        </>
      )}
    </div>
  );
};

export default Main;
