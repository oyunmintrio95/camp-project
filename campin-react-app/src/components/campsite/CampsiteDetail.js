import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import ReviewList from "../review/ReviewList";

import '../../css/campsiteDetail.css';


export default function CampsiteDetail(){

    // const [campsite, setCampsite] = useState(null);
    const location = useLocation();
    const parkCode = location.state;
    const [userId, setUserId] = useState(0);

    const [campsite, setCampsite] = useState(null);
    
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
                setIsFavorite(true);
                return res.json();
           }else if(res.status === 404) {
                setIsFavorite(false);
           }else{
                setIsFavorite(false);
           }
        })
        .then(data => {
            setFavorite(data)
        });
    
    
    }

    // useEffect(() => {
    //     if(user){
    //        fetchFavorite();
    //        console.log(isFavorite);
    //     }
        
    // },[])



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
                setCampsite(info.data[0])})
            .catch(error =>{
                console.error(error)
                navigate("/campsite")
            })
        }

    }, []);

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
        <div className="container pb-4 rounded-2" id="campDetailBox">
            {campsite&& <>
            <div className="mb-2 d-flex justify-content-between">
                <div className="mt-3">
                    <h2 className="ps-3"> &lt; {campsite.name} &gt;</h2>
                </div>
                <div>
                    {user && (
                        !isFavorite? <a><i className="bi bi-star fs-3" onClick={handleFavoriteAdd}></i></a> : <a  onClick={handleFavoriteDelete}><i className="bi bi-star-fill fs-3" style={{color: "#ffbf00"}}></i></a> 
                    )  }
                </div>
                
                

            </div>
        
        <div className="row justify-content-evenly mb-2">
            <div className = "col-6">
            { campsite.images[0].url?
                                <img src={campsite.images[0].url} className="img-fluid rounded-3" alt={campsite.images[0].altText} 
                                style = {{height: 500, width:500, resizeMode : 'contain'}}></img> : <img src='/campsite_search_placeholder.jpg' class="img-fluid rounded-start" alt={campsite.images[0].altText} 
                                style = {{height: 100, width:100}}></img> }
            </div>
            <div className = "col mb-2">
                <div className="mb-2 ">
                    <span className="detailTitles">Location: </span> {campsite.addresses.length !==0?campsite.addresses[0].line1: " " } {campsite.addresses.length !==0? campsite.addresses[0].city: " "},<br></br>{campsite.addresses.length !==0? campsite.addresses[0].stateCode: " "}, {campsite.addresses.length !==0? campsite.addresses[0].countryCode: " "}, {campsite.addresses.length !==0? campsite.addresses[0].postalCode: " "}
                </div>
                <div className="mb-2">
                    <span className="detailTitles">ParkCode: </span> {campsite.parkCode}
                </div>
                <div className="mb-2">
                    <span className="detailTitles">Amenities: </span>
                    <div>
                        <ul>
                            <li><span role="img" aria-label="internet">🌐</span>Internet: {campsite.amenities.internetConnectivity}</li>
                            <li><span role="img" aria-label="restroom">🚻</span>Toilets: {campsite.amenities.toilets[0]}</li>
                            <li><span role="img" aria-label="shower">🚿</span>Shower: {campsite.amenities.showers}</li>
                            <li><span role="img" aria-label="phone">📱</span>Cell Phone Reception: {campsite.amenities.cellPhoneReception}</li>
                            <li><span role="img" aria-label="firewood">🪵</span>Fire Wood For Sale: {campsite.amenities.firewoodForSale}</li>
                            <li><span role="img" aria-label="ice">🧊</span>Ice Available for sale: {campsite.amenities.iceAvailableForSale}</li>
                            <li><span role="img" aria-label="fppd storage">🛅</span>Food Storage Locker: {campsite.amenities.foodStorageLockers}</li>
                        </ul>
                    </div>    
                </div>
                <div className="mb-2">
                    <span className="detailTitles">Contact</span>
                    <div>
                        Phone: {campsite.contacts.phoneNumbers.length === 0? "": campsite.contacts.phoneNumbers[0].phoneNumber}
                    </div>    
                    <div>
                        Email Addresses: {campsite.contacts.emailAddresses.length === 0? "": campsite.contacts.emailAddresses[0].emailAddress}
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

        {campsite.regulationsOverview.length === null && (
            <div className="mb-2">
            <span className="detailTitles">Regulation overview: </span>
            <div>
                {campsite.regulationsOverview}
            </div>    
            </div>
        )}
        <hr></hr>

        <div className="mb-2 d-flex justify-content-between">
            <div>
                <h3 className="ps-2">Reviews</h3>
            </div>
            <div>
                {user && <Link className="btn btn-success" to={'/review/add'} state={campsite}>Add Review</Link>}
            </div>
        </div>
        <div className="mb-4 ps-2">
            <ReviewList locationId = {locationId} campsite={campsite}/>
        </div>
        </>}
        </div>
    );
}