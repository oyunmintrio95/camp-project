import React from 'react';
import googleMapReact from 'google-map-react';
import { Icon } from '@iconfy/react';
import locationIcon from '@iconfy/icons-mdi/map-marker'
import './map.css';


export default function Map(){
    // props: { location, zoomLevel }
    const location = {
        address: '1600 Amphitheatre Parkway, Mountain View, california.',
        lat: 37.42216,
        lng: -122.08427,
      }

    return(
        <div className="map">
            <h2 className="map-h2">Come Visit Us At Our Campus</h2>

            <div className="google-map">
            <googleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCE6PREhnCRE5E-WFNrZjoXpdQIQBaEUhQ' }}
                defaultCenter={location}
                defaultZoom={zoomLevel}
            >
                <LocationPin
                lat={location.lat}
                lng={location.lng}
                text={location.address}
                />
            </googleMapReact>
    </div>
  </div>
    );
}