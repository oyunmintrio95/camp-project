import { useState, useEffect } from "react";
import xml2json from "xml-js";
// import XMLParser from 'react-xml-parser';
import CampsiteDetail from "./CampsiteDetail";

function SearchCampsite(){

    const [campsites, setCampsites] = useState([]);
 
    useEffect(() => {
        const init = {
            // method: 'GET',
            headers: {
                'Content-Type': 'text/xml;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        }

        fetch(' http://api.amp.active.com/camping/campgrounds?pstate=CA&api_key=guu5djxyw5s7rfattpw93fny',init)
			.then(res => res.text())
            .then((xmlText) =>{
                const jsonData = xml2json.xml2json(xmlText, {compact: true, spaces: 4});
                setCampsites(JSON.parse(jsonData));
            })
            .catch((error) => {
                console.error('Error fetching XML data:', error);
            });
			
            // .then(data => {
            //     var XMLParser = require('react-xml-parser');
            //     const xml = new XMLParser().parseFromString(data);
            //     console.log(xml)
            // })
          
          
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