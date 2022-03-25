import React, { useEffect } from "react";

const Home = ({ doStart, highScore }) => {
  useEffect(() => {
    document.addEventListener("keydown", doStart, { once: true });
  }, []);

  return (
    <>
      <h3>
        high score:<span>{highScore}</span>
      </h3>
      <h1 className="start-title">
        press <span>‘space’</span> or
      </h1>
      <button
        className="start-button"
        onClick={() => doStart({ code: "Space" })}
      >
        start
      </button>
    </>
  );
};

export default Home;
