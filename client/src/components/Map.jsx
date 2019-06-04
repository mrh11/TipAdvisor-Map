import React,{useState} from "react"
import { withScriptjs, withGoogleMap} from "react-google-maps"
import GoogleMapWrapperComponent from './GoogleMapWrapperComponent.jsx';

export const Map = withScriptjs(withGoogleMap((props) => {
  const [places, updatePlaces] = useState('');
  const refs = {
    map: undefined
  }
  const myFunc = {
      onMapMounted: () => ref => {
        refs.map = ref
      }}
  const fetchPlaces = () => {
        const bounds = refs.map.getBounds();
        const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
        const request = {
          bounds: bounds,
          type: ['lodging', 'restuarant']
        };
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            updatePlaces(results)
          }
        })
    }
  return <GoogleMapWrapperComponent fetchPlaces={fetchPlaces} onMapMounted={myFunc.onMapMounted} {...props} places={places} />
}));

// export default Map;
