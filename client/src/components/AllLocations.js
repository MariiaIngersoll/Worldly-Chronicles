import React from "react";
import { Link, useNavigate } from 'react-router-dom';
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
        <Link key={loc.id} to={`/locations/${loc.country}`}>
          {loc.country}
        </Link>
      ))}
    </div>
  );
}

export default AllLocations;