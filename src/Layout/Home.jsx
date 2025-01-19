import React from "react";
import "./App.css";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <div>
      <Helmet>
        <title>SATS | Home</title>
        <meta name="description" content="Welcome to SATS" />
      </Helmet>
      <h1>SATS</h1>
      <h2>Making people happier and healthier</h2>
    </div>
  );
}

export default Home;
