import React from "react";
import AllClubs from "./allClubs";

function ClubOverview() {
  return (
    <div>
      <h1>Club Overview</h1>
      <h2>This page will display an overview of all clubs.</h2>
      <AllClubs /> {/* AllClubs is rendered here */}
    </div>
  );
}

export default ClubOverview;
