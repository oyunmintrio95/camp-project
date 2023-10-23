import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CampsiteDetail from "./CampsiteDetail";
import Map from "../map/Map";

function SearchCampsite(){

    const [campsites, setCampsites] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const navigate = useNavigate();

    // fetch('https://developer.nps.gov/api/v1/campgrounds?stateCode=CA&api_key='+ process.env.REACT_APP_API_KEY_2)

    // console.log(process.env.REACT_APP_API_KEY_2)
 
    useEffect(() => {
    
          
          
    },[]);

    function handleChange(event){
        setSearchInput(event.target.value);
    }


    function handleSearch(event){
        event.preventDefault();
        fetch(`https://developer.nps.gov/api/v1/campgrounds?q=${searchInput}&api_key=${process.env.REACT_APP_API_KEY_2}`)
            .then(res => {
                if(res.ok) {
                     return res.json()
                }else{
                    return Promise.reject(
                        new Error(`Unexpected status code ${res.status}`)
                    );
                }
            })
            .then( info => setCampsites(info.data))
            .catch(error =>{
                console.error(error)
                navigate("/campsite/search")
            })

    }
    // console.log(campsites);
    return(
        <div className="row">
            <div className="col-3">
                <form className="row doSearchCampsite" onSubmit={handleSearch}>
                    <div className="col">
                        <input type="text" className="form-control" id="p" name="p" placeholder="Search Campsite"
                        onChange={handleChange}
                        value={searchInput}></input>
                    </div>
                    <div className="col">
                        <button className="btn btn-outline btn-success" type = 'submit'>Search</button>
                    </div>
                </form>
            </div>
            <div className="col">
                <Map campsites = {campsites}/>
            </div>
            
        </div>
    );
}
export default SearchCampsite;