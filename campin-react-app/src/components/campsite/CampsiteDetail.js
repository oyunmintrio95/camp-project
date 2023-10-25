import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import ReviewList from "../review/ReviewList";


export default function CampsiteDetail(){

    // const [campsite, setCampsite] = useState(null);
    const location = useLocation();
    const campsite = location.state;
    const [userId, setUserId] = useState(0);
    
    const [isFavorite, setIsFavorite] = useState(false);
    const {user} = useContext(AuthContext);

    // console.log(campsite.name);
    const navigate = useNavigate();

    const {locationId} = useParams();

    const [favorite, setFavorite] = useState(null);

   

    const fetchFavorite = () => {
        const jwtToken = localStorage.getItem('jwt_token');
        if (!jwtToken) {
            return Promise.reject('Unauthorized.')
          }
        const init = {
            headers: {
                "Authorization": "Bearer " + jwtToken
            }
        }
        fetch(`http://localhost:8080/api/favorite/${user.userId}/${locationId}`,init)
        .then(res => {
           if(res.status === 200){
                console.log(" success!")
                setIsFavorite(true);
                return res.json();
           }else if(res.status === 404) {
                console.log("cannot find!")
                setIsFavorite(false);
           }else{
                console.log("unexpected error!")
                setIsFavorite(false);
           }
        })
        .then(data => {
            setFavorite(data)
            console.log(favorite);
        });
    
    
    }

    useEffect(() => {
        if(user){
           fetchFavorite();
           console.log(isFavorite);
        }
        
    },[])



    // useEffect(() => {
    //     if(locationId){
    //         fetch(`https://developer.nps.gov/api/v1/campgrounds?parkCode=${parkCode}&q=${locationId}&api_key=${process.env.REACT_APP_API_KEY_2}`)
    //         .then(res => {
    //             if(res.ok) {
    //                  return res.json()
    //             }else{
    //                 return Promise.reject(
    //                     new Error(`Unexpected status code ${res.status}`)
    //                 );
    //             }
    //         })
    //         .then( info => {
    //             console.log(info.data);
    //             console.log(info.data[0])
    //             setCampsite(info.data[0])})
    //         .catch(error =>{
    //             console.error(error)
    //             navigate("/campsite/search")
    //         })
    //     }

    // }, []);

    function handleFavoriteAdd(){
        const jwtToken = localStorage.getItem('jwt_token');
        if (!jwtToken) {
            return Promise.reject('Unauthorized.')
          }
        const config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + jwtToken,
            },
            body: JSON.stringify({
                appUserId: user.userId,
                locationId: locationId,
                // parkCode: campsite.parkCode,
            })
        }

        fetch(`http://localhost:8080/api/favorite`, config)
            .then(res => {
                if(res.ok){
                    console.log("added!");
                    setIsFavorite(true);
                    fetchFavorite();
                }else{
                    setIsFavorite(false);
                    return res.json();
                }
            })
            .then(errs => {
                if(errs){
                    setIsFavorite(false);
                    return Promise.reject(errs);
                }
            })
            // .catch(errs => {
            //     if(errs.length){
            //         setErrors(errs);
            //     }else{
            //         setErrors([errs]);
            //     }
            // });
        

    }

    function handleFavoriteDelete(){
        const jwtToken = localStorage.getItem('jwt_token');
        if (!jwtToken) {
            return Promise.reject('Unauthorized.')
          }
        
        const config = {
            method: "DELETE",
            headers: {
                'Authorization': "Bearer " + jwtToken,
            },
        }

        fetch(`http://localhost:8080/api/favorite/${favorite.favoriteId}`, config)
        .then(res => {
            if(res.status === 204){
                setIsFavorite(false);
            }else{
                setIsFavorite(true);
            }
        })

    }

    
    return(
        <>
        <div className="mb-2 d-flex justify-content-between">
            <div>
                <h2> {campsite.name} {user.userId}</h2>
            </div>
            <div>
                {user && !isFavorite? <a><i className="bi bi-star fs-3" onClick={handleFavoriteAdd}></i></a> : <a  onClick={handleFavoriteDelete}><i className="bi bi-star-fill fs-3" style={{color: "#ffbf00"}}></i></a>  }
            </div>
            
            

        </div>
        
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
        <div className="mb-2 d-flex justify-content-between">
            <div>
                <h1>Reviews</h1>
            </div>
            <div>
                {user && <Link className="btn btn-success" to={'/review/add'} state={campsite}>Add Review</Link>}
            </div>
        </div>
        <div className="mb-2">
                <ReviewList locationId = {locationId}/>
        </div>
        </>
        
    );
}