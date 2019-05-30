import React from "react"
import { compose, withProps, withHandlers, withState } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import API_KEY from "../../../config.js";

const Map = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `500px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap,
    withState('places', 'updatePlaces', ''),
    withHandlers( () => {
        const refs = {
            map: undefined,
        }

        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            fetchPlaces: ({ updatePlaces }) => {
                const bounds = refs.map.getBounds();
                const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
                const request = {
                    bounds: bounds,
                    type: ['lodging', 'restaurant']
                };
                service.nearbySearch(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        
                        updatePlaces(results);
                    }
                })
            }
        }
    }),
)((props) => {

    let hotelLink = "https://iconfree.net/32x32/2018/4/27/hotel-sleepy-furniture-and-household-icon-7015-512x512.png";
    let restaurantLink = "https://iconfree.net/32x32/2018/4/27/room-service-food-and-restaurant-service-icon-1170-512x512.png";
    let attractionLink = "https://iconfree.net/32x32/2018/1/29/pass-show-ticket-icon-8256-512x512.png";
    let locationLink = "https://iconfree.net/64x64/2011/1/5/location-start-favorite-icon-9146-128x128.png";

    return (
        <GoogleMap ref={props.onMapMounted} defaultZoom={15} defaultCenter={props.location}>
          {props.places && props.places.map((place, i) => { 
            let lodgeTest = place.types.includes('lodging');
            let restaurantTest = place.types.includes('restaurant');
            let POITest = place.types.includes('point_of_interest');
            let name = place.name;
            let info = place;

            if (lodgeTest && !restaurantTest && props.showLodging) { 
              return (
                <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} icon={hotelLink} onClick={()=>{props.updateSelectedName(name);}}/>
              )
            } else if (restaurantTest && props.showRestaurants) {
              return (
                <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} icon={restaurantLink} onClick={()=>{props.updateSelectedName(name)}}/> 
              )
            } else if (POITest && !place.types.includes('lodging') && !restaurantTest && props.showAttractions) {
              return (
                <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} icon={attractionLink} onClick={()=>{props.updateSelectedName(name)}}/>
              )
            }
          })}
          
          <Marker position={props.location} icon={locationLink}> 
            <h3>Selected: {props.selectedName}</h3> 
          </Marker>
         
            <form>
              <label> <input type="checkbox" onClick={props.updateRestaurants} /> Hide Restaurants </label>
              <label> <input type="checkbox" onClick={props.updateAttractions} /> Hide Attractions </label>
              <label> <input type="checkbox" onClick={props.updateLodging} /> Hide Hotels </label>
            </form>

            <div onLoad={props.fetchPlaces}>
            <button onClick={props.fetchPlaces}>Search Nearby</button>
            </div>

        </GoogleMap>
    )
})

export default class MyFancyComponent extends React.PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        showLodging: true,
        showRestaurants: true,
        showAttractions: true,
        selectedName: 'Select Marker',
      }
      this.updateLodging = this.updateLodging.bind(this);
      this.updateRestaurants = this.updateRestaurants.bind(this);
      this.updateAttractions = this.updateAttractions.bind(this);
      this.updateSelectedName = this.updateSelectedName.bind(this);
    }

    updateSelectedName(name) {
      this.setState({selectedName: name});
    }

    updateLodging() {
      this.setState({showLodging: !this.state.showLodging});
    }

    updateRestaurants() {
      this.setState({showRestaurants: !this.state.showRestaurants});
    }

    updateAttractions() {
      this.setState({showAttractions: !this.state.showAttractions});
    }

    render() {
        return (
          <div >
            <Map {...this.props} 
              updateLodging={this.updateLodging} 
              showLodging={this.state.showLodging}
              updateRestaurants={this.updateRestaurants}
              showRestaurants={this.state.showRestaurants}
              updateAttractions={this.updateAttractions}
              showAttractions={this.state.showAttractions}
              updateSelectedName={this.updateSelectedName}
              selectedName={this.state.selectedName}/>
          </div>
        )
    }
}