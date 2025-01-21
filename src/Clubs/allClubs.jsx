import React, { useState, useEffect } from "react";

const API_BASE_URL = "/clubs-v2/sats";
const CLUBS_ENDPOINT = `${API_BASE_URL}/clubs?country=Norway`;

const AllClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch(CLUBS_ENDPOINT);

        if (!response.ok) {
          throw new Error("Failed to fetch clubs");
        }

        const data = await response.json();
        setClubs(data.clubs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const renderOpeningHours = (openingHours) => {
    if (!openingHours?.regularOpeningHours?.[0]?.days) {
      return "No opening hours available";
    }
    return openingHours.regularOpeningHours[0].days.map((day) => (
      <span key={day.day} className="club-day">
        {day.day}: {day.timeSpans[0]?.opens?.hour}:
        {day.timeSpans[0]?.opens?.minute.toString().padStart(2, "0")} -{" "}
        {day.timeSpans[0]?.closes?.hour}:
        {day.timeSpans[0]?.closes?.minute.toString().padStart(2, "0")}
      </span>
    ));
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="club-container">
      <h1 className="title">All Clubs</h1>
      <div className="club-list">
        {clubs.map((club) => (
          <div key={club.id} className="club-card">
            <h2 className="club-name">{club.name}</h2>
            <p className="club-address">
              {club.address.address1}, {club.address.city}, {club.address.country}
            </p>
            <p className="club-hours">
              <strong>Opening Hours:</strong>
              {club.openingHours?.regularOpeningHours[0]?.days.map((day) => (
                <div key={day.day} className="opening-hours-item">
                  <span className="day">{day.day}</span>
                  <span className="hours">
                    {day.timeSpans[0].opens.hour}:
                    {day.timeSpans[0].opens.minute.toString().padStart(2, "0")} -
                    {day.timeSpans[0].closes.hour}:
                    {day.timeSpans[0].closes.minute.toString().padStart(2, "0")}
                  </span>
                </div>
              ))}
            </p>
            <p className="club-visitor-load">Visitor Load: {club.visitorLoad || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClubs;
