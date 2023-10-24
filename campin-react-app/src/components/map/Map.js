import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Link } from "react-router-dom";

import mapStyles from "./mapStyles";
import './map.css';
import { useCallback, useEffect, useRef, useState } from "react";

const libraries = ["places"]
const mapContainerStyle = {
    width: '100vw',
    height: "100vh",
};
const center = {
    lat :39.23636566733842,
    lng: -98.35920780360868
};

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
}

export default function Map({campsites}){
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
        libraries,
    });
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        onMapLoad();
    }, []);

    const onMapClick = useCallback((event) => {
        setMarkers(current => [...current, {
            lat: event.latLng.lat(),
            lng:event.latLng.lng(),
            time: new Date(),
        }])
    }, []);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading Maps"

    return(
        <div>
            {/* <h1 id="mapTitle">CampenJoy 
                <span role="img" aria-label="tent">🏕️</span></h1> */}

           <GoogleMap 
           mapContainerStyle={mapContainerStyle} 
           zoom={5} 
           center={center}
           options={options}
           onClick = {onMapClick}
           onLoad={onMapLoad}
           >
                {campsites.map((marker) => (
                <Marker key={marker.id} 
                position = {{lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude)}}
                icon = {{
                    url: '/tent3.png',
                    scaledSize: new window.google.maps.Size(40,40),
                    origin: new window.google.maps.Point(0,0),
                    anchor: new window.google.maps.Point(20,20),
                }}
                onClick={() => {
                    setSelected(marker);
                }}
                />
                ))}

                {selected ? (
                <InfoWindow position = {{lat: parseFloat(selected.latitude), lng: parseFloat(selected.longitude)}} 
                onCloseClick={() => {
                    setSelected(null);
                }}>
                    <div className="row g-0">
                            <div className="col-md-4">
                                {selected.images[0].url?
                                <img src={selected.images[0].url} className="img-fluid rounded-start" alt={selected.images[0].altText} 
                                style = {{height: 100, width:100}}></img> : <img src='/campsite_search_placeholder.jpg' className="img-fluid rounded-start" alt={selected.images[0].altText} 
                                style = {{height: 100, width:100}}></img> }
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{selected.name}</h5>
                                    <p className="card-text">{selected.addresses.length !==0? selected.addresses[0].line1: " " } {selected.addresses.length !==0?selected.addresses[0].city: " "},<br></br>{selected.addresses.length !==0? selected.addresses[0].stateCode: " "}, {selected.addresses.length !==0? selected.addresses[0].countryCode: " "}, {selected.addresses.length !==0? selected.addresses[0].postalCode: " "}</p>
                                </div>
                                <div className="mt-2 d-flex justify-content-end ">
                                    <Link className="btn btn-outline-success" to={`/campsite/detail/${selected.id}` } state = {selected}>Detail</Link>
                                </div>
                                
                            </div>
                        </div>
                </InfoWindow>
                ): null}

           </GoogleMap>
        </div>
    );

}
