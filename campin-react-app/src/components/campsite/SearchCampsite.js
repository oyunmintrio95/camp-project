import { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader"
// import xml2json from "xml-js";
// import XMLParser from 'react-xml-parser';
import CampsiteDetail from "./CampsiteDetail";

function SearchCampsite(){

    const [campsites, setCampsites] = useState([]);

    // fetch('https://developer.nps.gov/api/v1/campgrounds?stateCode=CA&api_key=qOGB5Pye1mijeNs9sjhNIMPrTLdVUvy1WaqvjBny')

    const loader = new Loader({
        apiKey: "AIzaSyCE6PREhnCRE5E-WFNrZjoXpdQIQBaEUhQ",
        version: "weekly",
        ...additionalOptions,
      });
      
      loader.load().then(async () => {
        const { Map } = await google.maps.importLibrary("maps");
      
        map = new Map(document.getElementById("map"), {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        });
      });
 
    useEffect(() => {
    
          
          
    },[]);

    // console.log(campsites);
    return(
        <div>
            {/* {campsites.map(campsite => {
                <p>{campsite}</p>
            })} */}
        </div>
    );
}
export default SearchCampsite;