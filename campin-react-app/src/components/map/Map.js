import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from './LocationPin';
import './map.css';


export default function Map(){
    // props: { location, zoomLevel }
    const location = {
        address: '1600 Amphitheatre Parkway, Mountain View, california.',
        lat: 37.42216,
        lng: -122.08427,
    }

    const zoomLevel = 10;

    return(
        <div className="map">
            <h2 className="map-h2">Come Visit Us At Our Campus</h2>

            <div className="google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCE6PREhnCRE5E-WFNrZjoXpdQIQBaEUhQ' }}
                defaultCenter={location}
                defaultZoom={zoomLevel}
            >
                <LocationPin
                lat={location.lat}
                lng={location.lng}
                text={location.address}
                />
            </GoogleMapReact>
    </div>
  </div>
    );
}