import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Layout/Home";
import Header from "./Layout/Header";
import AllClubs from "./Clubs/allClubs";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <AllClubs />
    </Router>
  );
}

export default App;
