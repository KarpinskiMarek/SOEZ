import React, { useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const MyMap = ({ location }) => {
    
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const APIkey = '';
    
    useEffect(() => {

        const loadMap = async () => {

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: `${location.name}, ${location.country}` }, (results, status) => {
                if (status === "OK") {
                    setCenter(results[0].geometry.location);
                }
            });
        };

        if (location.name && location.country) {
            if (window.google && window.google.maps) {
                loadMap();
            }
        }
    }, [location]);

    return (
        <APIProvider apiKey={APIkey}>
            <Map
                style={{ height: '100%', width: '100%' }}
                center={center}
                zoom={10}
                loading="async"
            />
        </APIProvider>
    );

};

export default MyMap;
