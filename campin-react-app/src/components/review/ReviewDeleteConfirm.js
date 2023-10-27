import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import '../../css/reviewDelete.css';


export default function ReviewDeleteConfirm(){
    const {user} = useContext(AuthContext);

    const [review, setReview] = useState(null);
    const [success, setSuccess] = useState(false);
    const location = useLocation();
    const campsite = location.state;
    const {reviewId} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if(reviewId){
            fetch(`http://localhost:8080/api/review/${reviewId}`)
                .then(res => {
                    if (res.ok) {
						return res.json();
					} else {
						return Promise.reject(
							new Error(`Unexpected status code: ${res.status}`)
						);
                    }
                })
                .then(setReview)
                .catch(error => {
                    console.error(error);
                    navigate("/review/detail/"+reviewId);
                })
        }
    },[])

    function handleDelete(){
        const jwtToken = localStorage.getItem('jwt_token');
        if (!jwtToken) {
            return Promise.reject('Unauthorized.')
        }
    
        const config = {
            method: "DELETE",
            headers:{
                'Authorization': "Bearer " + jwtToken,
            },
        };

        fetch('http://localhost:8080/api/review/' + reviewId, config)
        .then(res => {
            if(res.ok){
                setSuccess(true);
                setTimeout(() => {
                    navigate('/campsite/detail/'+campsite.id, {state: campsite.parkCode});
                }, 2000);
            }else{
                return Promise.reject(
                    new Error(`Unexpected status code ${res.status}`)
                );
            }
        })
        .catch(error => {
            navigate('/campsite')
        })
    }

    if (!review) {
		return (
			<div
				style={{ minHeight: '80vh' }}
				className='d-flex justify-content-center align-items-center'>
				<div className='spinner-border ' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</div>
			</div>
		);
	}

    return (
		<div className="container col-lg-6 col-sm-8  pb-4 rounded-2" id="reviewDeleteBox">
            {success && (
				<div className='alert alert-success' role='alert'>
					<p>
						Successfully deleted review! Navigating back to
						campsite detail page ...{' '}
					</p>
				</div>
			)}
			<h2 className="pt-2">Delete the Review</h2>
			<div className="mb-2">
                <div className="confirmMsg">
                    Are you sure you want to delete the following review?
                </div>
				<ul>
					<li>
						<span className="detailTitles">Title:</span> {review.title}
					</li>
					<li><span className="detailTitles">Author:</span> {review.author}</li>
					<li><span className="detailTitles">Post Date: </span> {review.postDate}</li>
                    <li><span className="detailTitles">Content: </span> {review.review} </li>
				</ul>
            </div>
            <div className="mb-2 col d-flex justify-content-center">
                {review.imgUrl&&
                            <img src={review.imgUrl} className="img-fluid rounded-3" 
                            style = {{height: 500, width:500, resizeMode : 'contain'}}></img>}
            </div>
            <div className="mb-2 d-flex justify-content-end">
                <button onClick={handleDelete} className='btn' id="deleteConfirmBtn">
					Delete
				</button>
                {/* should navigate to campiste detail maybe.. */}
				<Link className='btn ms-2' to={`/review/detail/`+reviewId} state={campsite} id="deleteCancelBtn">
					Cancel
				</Link>
            </div>
                
				
			
			
		</div>
	);

}