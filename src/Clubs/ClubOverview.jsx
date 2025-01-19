import React from "react";
import AllClubs from "./allClubs";

function ClubOverview() {
  return (
    <div>
      <h1>Club Overview</h1>
      <p>This page will display an overview of all clubs.</p>
      <AllClubs /> {/* AllClubs is rendered here */}
    </div>
  );
}

export default ClubOverview;
