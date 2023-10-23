import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function CampsiteDetail({campsite}){

    const [campsite, setCampsite] = useState(null);
    const {locationId} =  useParams();

    useEffect(() => {
        fetch()

    }, locationId)

    
    return(
        <>
        <h2> This is a campsite detail page</h2>
            {/* <li>{campsite.id}</li>
            <li>{campsite.name}</li>
            <li>{campsite.url}</li>
            <li>{campsite.latitude}</li>
            <li>{campsite.longitude}</li>
            <li>{campsite.description}</li>
            <li>{campsite.reservationInfo}</li>
            <li>{campsite.reservationUrl}</li> */}
        </>
        
    );
}