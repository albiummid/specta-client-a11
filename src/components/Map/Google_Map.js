import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Google_Map = () => {
    const containerStyle = {
        width: '100%',
        height: '500px'
    };

    const center = {
        lat: 23.81,
        lng: 90.4125
    };
    const onLoad = marker => {
    }

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBgcL9WlQurkB-kRTgVhM62dKP7c8p1Hl4"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
            >
                <Marker
                    onLoad={onLoad}
                    position={center}
                />
            </GoogleMap>
        </LoadScript>
    );
};

export default Google_Map;