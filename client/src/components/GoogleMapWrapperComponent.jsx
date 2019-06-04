import React from 'react';
import {GoogleMap, Marker} from 'react-google-maps';

let GoogleMapWrapperComponent = (props) => {
  let hotelIcon = "https://iconfree.net/32x32/2018/4/27/hotel-sleepy-furniture-and-household-icon-7015-512x512.png";
  let restaurantIcon = "https://iconfree.net/32x32/2018/4/27/room-service-food-and-restaurant-service-icon-1170-512x512.png";
  let attractionIcon = "https://iconfree.net/32x32/2018/1/29/pass-show-ticket-icon-8256-512x512.png";
  let locationIcon = "https://iconfree.net/64x64/2011/1/5/location-start-favorite-icon-9146-128x128.png";
  return (
    <GoogleMap ref={props.onMapMounted()} defaultZoom={15} defaultCenter={props.location}>
      {props.places && props.places.map((place, i) => { 
        let name = place.name;
        if (props.showRestaurants && place.types.includes('restaurant')) {
          return ( <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} icon={restaurantIcon} onClick={()=>{props.updateSelectedName(name)}}/>);
        } else {
          if (props.showLodging && place.types.includes('lodging')) {
            return ( <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} icon={hotelIcon} onClick={()=>{props.updateSelectedName(name)}}/>) 
          } else if (props.showAttractions && place.types.includes('point_of_interest')) {
            return (<Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} icon={attractionIcon} onClick={()=>{props.updateSelectedName(name)}}/>)
          }
        }
      })}
      <Marker position={props.location} icon={locationIcon}> 
        <h3>Selected: {props.selectedName}</h3> 
      </Marker>
      <form>
        <label> <input type="checkbox" onClick={() => {props.updateRestaurants(!props.showRestaurants)}} /> Hide Restaurants </label>
        <label> <input type="checkbox" onClick={() => {props.updateAttractions(!props.showAttractions)}} /> Hide Attractions </label>
        <label> <input type="checkbox" onClick={() => {props.updateLodging(!props.showLodging);}} /> Hide Hotels </label>
      </form>
  
      <button onClick={props.fetchPlaces}>Search Nearby</button>
    </GoogleMap>
  )
}
export default GoogleMapWrapperComponent;