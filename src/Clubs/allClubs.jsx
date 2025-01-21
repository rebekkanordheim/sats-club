import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // for custom markers
import "leaflet/dist/leaflet.css"; // Leaflet CSS for the map

const API_BASE_URL = `/clubs-v2/sats/clubs?country=Norway`;

const AllClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_BASE_URL);
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

  if (loading) {
    return <div className="loading">Laster...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="club-container">
      <h1 className="title">Alle SATS sentre i Norge</h1>

      <div className="map-and-cards">
        {/* Map displaying club locations */}
        <div className="map-container">
          <MapContainer
            center={[60.472, 8.4689]}
            zoom={6}
            style={{ height: "300px", width: "100%" }} // smaller map size
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {clubs.map((club) =>
              club.geoLocation?.latitude && club.geoLocation?.longitude ? (
                <Marker
                  key={club.id}
                  position={[club.geoLocation.latitude, club.geoLocation.longitude]}
                  icon={
                    new L.Icon({
                      iconUrl:
                        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                      shadowUrl:
                        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
                      shadowSize: [41, 41],
                    })
                  }>
                  <Popup>
                    <h3>{club.name}</h3>
                    <p>
                      {club.address.address1}, {club.address.city}, {club.address.country}
                    </p>
                    <p>Visitor Load: {club.visitorLoad || "N/A"}</p>
                  </Popup>
                </Marker>
              ) : null
            )}
          </MapContainer>
        </div>

        {/* Club cards */}
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
              <p className="club-visitor-load">
                Visitor Load: {club.visitorLoad || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllClubs;
