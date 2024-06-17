import React, { useEffect, useState, useRef, useCallback } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const MyMap = ({ location }) => {
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [zoom, setZoom] = useState(10);
    const mapRef = useRef(null);
    const APIkey = 'AIzaSyCI2TCN3tdrOnykqkVYnmAYBzgP1M5ym-4';

    useEffect(() => {
        const loadMap = async () => {
            if (window.google && window.google.maps) {
                const gc = new window.google.maps.Geocoder();
                gc.geocode({ address: `${location.name}, ${location.country}` }, (results, status) => {
                    if (status === "OK") {
                        setCenter({
                            lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng(),
                        });
                    } else {
                        console.error(`Geocoding error: ${status}`);
                    }
                });
            }
        };

        if (location.name && location.country) {
            loadMap();
        }
    }, [location]);

    const onLoad = useCallback((map) => {
        mapRef.current = map;
        // Logowanie w celu debugowania
        console.log("Map loaded", map);
        // Enable user interaction with the map
        map.setOptions({
            zoomControl: true,
            scrollwheel: true,
            disableDoubleClickZoom: false,
            draggable: true,
            mapTypeControl: true,
            streetViewControl: true,
        });
    }, []);

    const handleZoomChanged = useCallback(() => {
        if (mapRef.current) {
            setZoom(mapRef.current.getZoom());
        }
    }, []);

    const handleCenterChanged = useCallback(() => {
        if (mapRef.current) {
            const newCenter = mapRef.current.getCenter();
            setCenter({
                lat: newCenter.lat(),
                lng: newCenter.lng(),
            });
        }
    }, []);

    return (
        <APIProvider apiKey={APIkey}>
            <Map
                onLoad={onLoad}
                style={{ height: '100%', width: '100%' }}
                center={center}
                zoom={zoom}
                onZoomChanged={handleZoomChanged}
                onCenterChanged={handleCenterChanged}
                loading="async"
            />
        </APIProvider>
    );
};

export default MyMap;
