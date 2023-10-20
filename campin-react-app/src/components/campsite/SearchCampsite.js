import { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader"
// import xml2json from "xml-js";
// import XMLParser from 'react-xml-parser';
import CampsiteDetail from "./CampsiteDetail";
import Map from "../map/Map";

function SearchCampsite(){

    const [campsites, setCampsites] = useState([]);

    // fetch('https://developer.nps.gov/api/v1/campgrounds?stateCode=CA&api_key='+ process.env.REACT_APP_API_KEY_2)

    // console.log(process.env.REACT_APP_API_KEY_2)
 
    useEffect(() => {
    
          
          
    },[]);

    // console.log(campsites);
    return(
        <div>
            {/* {campsites.map(campsite => {
                <p>{campsite}</p>
            })} */}
            <Map />
        </div>
    );
}
export default SearchCampsite;