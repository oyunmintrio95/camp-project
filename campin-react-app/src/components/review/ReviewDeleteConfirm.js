import { useState, useEffect,useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import AuthContext from "../../context/AuthContext";


export default function ReviewDeleteConfirm(){
    const [review, setReview] = useState(null);
    const [success, setSuccess] = useState(false);
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

        fetch('http://localhost:8080/api/review/delete/' + reviewId, config)
        .then(res => {
            if(res.ok){
                setSuccess(true);
                setTimeout(() => {
                    navigate('/campsite');
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
		<div>
			<h1>Delete</h1>
			<div className='alert alert-warning' role='alert'>
				<p>
					Are you sure you want to delete the following review?
				</p>
				<ul>
					<li>
						Title: {review.title}
					</li>
					<li>Author: {review.author}</li>
					<li>Content: {review.review}</li>
				</ul>
                <img src={review.imgUrl}/>
				<button onClick={handleDelete} className='btn btn-danger me-2'>
					Delete
				</button>
                {/* should navigate to campiste detail maybe.. */}
				<Link className='btn btn-secondary' to={`/campsite`}>
					Cancel
				</Link>
			</div>
			{success && (
				<div className='alert alert-success' role='alert'>
					<p>
						Successfully deleted review! Navigating back to
						campsite search page ...{' '}
					</p>
				</div>
			)}
		</div>
	);

}