import React from "react";
import { useNavigate } from 'react-router-dom';
function AllLocations({ locations }) {
  const navigate = useNavigate();

  const uniqueLocationsByCountry = {};
  locations.forEach((location) => {
    const country = location.country;
    if (!uniqueLocationsByCountry[country]) {
      uniqueLocationsByCountry[country] = location;
    }
  });

  const uniqueLocations = Object.values(uniqueLocationsByCountry);

  const handleLocationClick = (location) => {
    navigate(`/locations/${location.country}`);
  };

  return (
    <div className="locations-div">
      {uniqueLocations.map(loc => (
        <div onClick={() => handleLocationClick(loc)}>
          {loc.country}
        </div>
      ))}
    </div>
  );
}

export default AllLocations;