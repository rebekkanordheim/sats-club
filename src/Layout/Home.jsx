import React from "react";
import "./index.css";
import AboutText from "./AboutText";
import AllClubs from "../Clubs/allClubs";

function Home() {
  return (
    <div>
      <AboutText />
      <AllClubs />
    </div>
  );
}

export default Home;
