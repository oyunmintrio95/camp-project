import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";


export default function CampsiteDetail(){

    const [campsite, setCampsite] = useState(null);
    const location = useLocation();
    const parkCode = location.state;
    // console.log(campsite.name);
    const navigate = useNavigate();

    const {locationId} = useParams();

    useEffect(() => {
        if(locationId){
            fetch(`https://developer.nps.gov/api/v1/campgrounds?parkCode=${parkCode}&q=${locationId}&api_key=${process.env.REACT_APP_API_KEY_2}`)
            .then(res => {
                if(res.ok) {
                     return res.json()
                }else{
                    return Promise.reject(
                        new Error(`Unexpected status code ${res.status}`)
                    );
                }
            })
            .then( info => {
                console.log(info.data);
                console.log(info.data[0])
                setCampsite(info.data[0])})
            .catch(error =>{
                console.error(error)
                navigate("/campsite/search")
            })
        }

    }, []);

    
    return(
        <>
        <h2> {campsite.name}</h2>
        <div className="row">
            <div className = "col">
            { campsite.images[0].url?
                                <img src={campsite.images[0].url} className="img-fluid rounded-start" alt={campsite.images[0].altText} 
                                style = {{height: 500, width:500, resizeMode : 'contain'}}></img> : <img src='/campsite_search_placeholder.jpg' class="img-fluid rounded-start" alt={campsite.images[0].altText} 
                                style = {{height: 100, width:100}}></img> }
            </div>
            <div className = "col mb-2">
                <div className="mb-2">
                    <span className="detailTitles">Location: </span> {campsite.addresses.length !==0?campsite.addresses[0].line1: " " } {campsite.addresses.length !==0? campsite.addresses[0].city: " "},<br></br>{campsite.addresses.length !==0? campsite.addresses[0].stateCode: " "}, {campsite.addresses.length !==0? campsite.addresses[0].countryCode: " "}, {campsite.addresses.length !==0? campsite.addresses[0].postalCode: " "}
                </div>
                <div className="mb-2">
                    <span className="detailTitles">ParkCode: </span> {campsite.parkCode}
                </div>
                <div className="mb-2">
                    <span className="detailTitles">Amenities: </span>
                    <div>
                        <ul>
                            <li>Internet: {campsite.amenities.internetConnectivity}</li>
                            <li>Toilets: {campsite.amenities.toilets[0]}</li>
                            <li>Shower: {campsite.amenities.showers}</li>
                            <li>Cell Phone Reception: {campsite.amenities.cellPhoneReception}</li>
                            <li>Fire Wood For Sale: {campsite.amenities.firewoodForSale}</li>
                            <li>Ice Available for sale: {campsite.amenities.iceAvailableForSale}</li>
                            <li>Food Storage Locker: {campsite.amenities.foodStorageLockers}</li>
                        </ul>
                    </div>    
                </div>
                <div className="mb-2">
                    <span className="detailTitles">Contact</span>
                    <div>
                        Phone: {campsite.contacts.phoneNumbers.length === 0? "": campsite.contacts.phoneNumbers[0].phoneNumber}
                    </div>    
                    <div>
                        Email Addresses:{campsite.contacts.emailAddresses.length === 0? "": campsite.contacts.emailAddresses[0].emailAddress}
                    </div>
                </div>
            </div>
        </div>
        <div className="mb-2">
                    <span className="detailTitles">Description: </span>
                    <div>
                        {campsite.description}
                    </div>    
                </div>
                <div className="mb-2">
                    <span className="detailTitles">Regulation overview: </span>
                    <div>
                        {campsite.regulationsOverview}
                    </div>    
                </div>
        </>
        
    );
}