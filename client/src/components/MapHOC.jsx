import React, {useState} from "react"
import {Map} from './Map.jsx';

const MapHOC = (props) => {
  const [showLodging, updateLodging] = useState(true);
  const [showRestaurants, updateRestaurants] = useState(true);
  const [showAttractions, updateAttractions] = useState(true);
  const [selectedName, updateSelectedName] = useState('Select Marker');
  return (
    <div >
      <Map 
        {...props} //needed to pass down the latitude and longitude stored in the database
        showLodging={showLodging} updateLodging={updateLodging} 
        showRestaurants={showRestaurants} updateRestaurants={updateRestaurants}
        showAttractions={showAttractions} updateAttractions={updateAttractions}
        selectedName={selectedName} updateSelectedName={updateSelectedName}

        googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA2HgvRTPSLw4i4pSMxDJJAIInu9rM9d7o'} //info required for the Google Maps API
        loadingElement={<div style={{ height: `80%` }} />}
        containerElement={<div style={{ height: `500px` }} />}
        mapElement={<div style={{ height: `80%` }} />}
      />
    </div>
  )
}

export default MapHOC;