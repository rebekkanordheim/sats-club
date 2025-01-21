import React, { useState, useEffect } from "react";

const AllClubs = () => {
  // State to store the clubs data
  const [clubs, setClubs] = useState([]);

  // State to handle loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("/clubs-v2/sats/clubs?country=Norway");

        // Log response to inspect what's returned
        const text = await response.text(); // Get response as text
        console.log("Response text:", text); // This will show the raw response

        // Check if the response is JSON
        if (!response.ok) {
          throw new Error("Failed to fetch clubs");
        }

        // If the response is JSON, parse it
        const data = JSON.parse(text); // Manually parse the response
        setClubs(data.clubs);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error); // Log the error for debugging
        setError(error.message);
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>All Clubs</h1>
      <ul>
        {clubs.map((club) => (
          <li key={club.id}>
            <h2>{club.name}</h2>
            <p>
              {club.address.city}, {club.address.country}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllClubs;
