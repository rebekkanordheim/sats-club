import React from "react";
import AllClubs from "./allClubs";
import { Helmet } from "react-helmet";

function ClubOverview() {
  return (
    <div>
        <Helmet>
        <title>Holidaze | Home</title>
      </Helmet>
      <h1>Club Overview</h1>
      <h2>This page will display an overview of all clubs.</h2>
      <AllClubs /> {/* AllClubs is rendered here */}
    </div>
  );
}

export default ClubOverview;