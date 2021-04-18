import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

const Map = () => {

    const containerStyle = {
        minWidth: '300px',
        minHeight: '300px'
      };
      
      const center = {
        lat: 23.6850,
        lng: 90.3563
      };
    const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCzmtWIB03D3VoZcdf_GprLDLsZLOCfYSQ"
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
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
};

export default Map;