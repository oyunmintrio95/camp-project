import { useState, useContext, useEffect  } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

export default function FavoriteCard({myFavorite}){
    const {user} = useContext(AuthContext);
    const [campsite, setCampsite] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(myFavorite){
            fetch(`https://developer.nps.gov/api/v1/campgrounds?parkCode=${myFavorite.parkCode}&q=${myFavorite.locationId}&api_key=${process.env.REACT_APP_API_KEY_2}`)
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
                setCampsite(info.data[0])})
            .catch(error =>{
                console.error(error)
                navigate("/mypage")
            })
        }
    },[])

    return(
        <div className="col">
            {campsite && 
                <div className="card h-100" style={{width: "18rem"}}>
                {campsite.images.length!==0? <img src={campsite.images[0].url} className="card-img-top" 
                style={{height: '250px', objectFit: 'cover'}} alt={campsite.images[0].altText} /> : <img src='/campsite_search_placeholder.jpg' className="card-img-top" style={{height: '250px', objectFit: 'cover'}} alt="camp photo" ></img>}
                <div className="card-body">
                    
                    <div className="card-title" style={{fontWeight: "500"}}>{campsite.name}</div>
                                <p className="card-text">{campsite.addresses.length !==0? campsite.addresses[0].line1: " " } {campsite.addresses.length !==0?campsite.addresses[0].city: " "}<br></br>{campsite.addresses.length !==0? campsite.addresses[0].stateCode: " "} {campsite.addresses.length !==0? campsite.addresses[0].countryCode: " "} {campsite.addresses.length !==0? campsite.addresses[0].postalCode: " "} </p>
                                <div className="d-flex justify-content-end me-3 mb-3">
                                <Link className="btn btn-outline-success" to={`/campsite/detail/${campsite.id}` } state = {campsite.parkCode}>Detail</Link>
                                </div>
                    </div>
            </div> 
            }
        </div>
    );

}