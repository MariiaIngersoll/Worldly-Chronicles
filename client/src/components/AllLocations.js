import React, { useEffect } from "react"
import { Link} from 'react-router-dom';

function AllLocations({ locations, setLocations }) {

  const updateLocations = () => {
    fetch("http://127.0.0.1:5555/api/locations")
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      });
  };

  useEffect(() => {
    updateLocations();
  }, []); 


  const uniqueLocationsByCountry = {};
  locations.forEach((location) => {
    const country = location.country;
    if (!uniqueLocationsByCountry[country]) {
      uniqueLocationsByCountry[country] = location;
    }
  });

  const uniqueLocations = Object.values(uniqueLocationsByCountry);


  return (
    <div className="locations-grid">
      {uniqueLocations.map(loc => (
        <div key={loc.id} className="location-card">
          <Link to={`/locations/${loc.country}`}>
            {loc.country}
            <img src={'https://icon-library.com/images/country-icon/country-icon-2.jpg'}  alt={loc.country} className="logo"/>
          </Link>
        </div>
      ))}
    </div>
  );
}


export default AllLocations;