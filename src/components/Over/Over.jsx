import React, { useEffect } from "react";

const Over = ({ setPage, doStart, score, highScore }) => {
  useEffect(() => {
    document.addEventListener("keydown", doStart, { once: true });
  }, []);

  return (
    <>
      <h2 className="over-title">game over</h2>
      <h3>
        score: <span>{score}</span>
      </h3>
      <h3>
        high score: <span>{highScore}</span>
      </h3>
      <h4>
        press <span>‘space’</span> or
      </h4>
      <button
        className="start-button"
        onClick={() => doStart({ code: "Space" })}
      >
        restart
      </button>
    </>
  );
};

export default Over;
