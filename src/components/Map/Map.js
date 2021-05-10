import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

const Map = () => {

    const containerStyle = {
        width: '100%',
     height: '300px'
      };
      
      const center = {
        lat: 23.6850,
        lng: 90.3563
      };
    const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBgcL9WlQurkB-kRTgVhM62dKP7c8p1Hl4"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={50}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
};

export default Map;