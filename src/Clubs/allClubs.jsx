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
        const response = await fetch(
          "https://hfnapi.sats.com/clubs-v2/sats/clubs?counrty=Norway"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch clubs");
        }
        const data = await response.json();
        setClubs(data.clubs); // Store the clubs data in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message); // Set error if there is any
        setLoading(false);
      }
    };

    fetchClubs();
  }, []); // Empty array means this effect runs only once when the component mounts

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
            {/* Add more information as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllClubs;