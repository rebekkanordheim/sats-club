import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Layout/Home";
import Header from "./Layout/Header";
import ClubOverview from "./Clubs/ClubOverview";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cluboverview" element={<ClubOverview />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
