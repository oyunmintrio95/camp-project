import { useEffect, useState, useContext } from 'react';
import {Link, useParams, useNavigate, useLocation} from 'react-router-dom';

import AuthContext from '../../context/AuthContext';

import './imageUpload.css';


export default function ReviewForm(){

    const {user} = useContext(AuthContext);

    const location = useLocation();
    const campsite = location.state;

    const DEFAULT_REVIEW = {
        appUserId : user.userId,
        locationId : campsite.id,
        title : "",
        review : "",
        parkCode: campsite.parkCode,
        author: user.username,
        imgUrl : "",
        

    }
    
    const[review, setReview] = useState(DEFAULT_REVIEW);

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { reviewId } = useParams();

    useEffect(() => {
        if(reviewId){
            fetch(`http://localhost:8080/api/review/${reviewId}`)
                .then(res => res.json())
                .then(setReview)
                .catch(error => {
                    setErrors(error);
                    //should navigate to campsite detail page.
                    navigate=("/campsite");
                })
        }
    },[reviewId])

    

    function byId(id) {
        return document.getElementById(id);
    }
    
    const imgPreview = byId("imgPreview");
    const preview = byId("preview");
    let currentFile;

    function handleImgChange(event){
        if (event.target.files.length === 0) {
            return;
        }
    
        let reader = new FileReader();
        reader.onload = function () {
            if(imgPreview){
                imgPreview.src = reader.result;
            }
            if(preview){
                preview.style.display = "block";
            }
            
        };
        currentFile = event.target.files[0];
        reader.readAsDataURL(currentFile);
    
    }
    
    function handleReviewSubmit(event){
        const formData = new FormData();
        formData.append("file", currentFile, currentFile.name);

        const jwtToken = localStorage.getItem('jwt_token');
        if (!jwtToken) {
            return Promise.reject('Unauthorized.')
          }
    
        const init = {
            method: "POST",
            headers:{
                'Authorization': "Bearer " + jwtToken,
            },
            body: formData
        };
        event.preventDefault();

        fetch("http://localhost:8080/api/review/upload", init)
            .then((res) =>{
                console.log("success!");
                console.log(res);
                return res.json();
            } )
            .then((data) => {
                return data;
            })
            .then((data) => {
                setReview({...review,
                    imgUrl: data.url});
                if(reviewId > 0){
                    updateReview({...review,
                        imgUrl: data.url});
                }else{
                    createReview({...review,
                        imgUrl: data.url});
                }
                

            })
            .catch(console.error);
    };

    function handleChange(event){
        setReview({
            ...review,
            [event.target.name]:
            event.target.value,
        });

    }
    // function handleReviewSubmit(event){
    //     event.preventDefault();
    //     console.log("submit button hit");
    //     console.log(review);
    //     createReview();
    // }

    function createReview(newReview){
        const jwtToken = localStorage.getItem('jwt_token');
        if (!jwtToken) {
            return Promise.reject('Unauthorized.')
        }
    
        const config = {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + jwtToken,
            },
            body: JSON.stringify(newReview)
        };

        fetch("http://localhost:8080/api/review", config)
            .then(res => {
                if(res.ok){
                    navigate("/campsite");
                }else{
                    return res.json();
                }
            })
            .then(err => {
                if(err){
                    return Promise.reject(err);
                }
            })
            .catch(errs => {
                if(errs.length){
                    setErrors(errs);
                }else{
                    setErrors([errs]);
                }
            });

    }

    function updateReview(newReview){
        const jwtToken = localStorage.getItem('jwt_token');
        if (!jwtToken) {
            return Promise.reject('Unauthorized.')
        }
    
        const config = {
            method: "PUT",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + jwtToken,
            },
            body: JSON.stringify(newReview)
        };

        fetch("http://localhost:8080/api/review/" + reviewId, config)
        .then(res => {
            if (res.ok) {
                navigate('/campsite');
            } else if (res.status === 400) {
                return res.json();
            }
        })
        .then(errors => {
            setErrors(errors);
        })
        .catch(console.error);

    }

    return (
        <>
			{/* <h1>{reviewId > 0 ? 'Update' : 'Add'} Review</h1> */}
            <h1>Add Review</h1>
			<form className='solar-panel-form' onSubmit={handleReviewSubmit} >
				<div className='row  mb-3'>
					<div className='col-12 col-md-6'>
						<label htmlFor='appUserId'>appUserId</label>
						<input
							className='form-control'
							type='number'
							name='appUserId'
							id='appUserId'
                            readOnly
							value={user.userId}
							onChange={handleChange}
						/>
					</div>
					<div className=' col'>
                        <label htmlFor='author'>author</label>
						<input
							className='form-control'
							type='text'
							name='author'
							id='author'
                            readOnly
							value={user.username}
							onChange={handleChange}
						/>
					</div>
				</div>
                <div className='row  mb-3'>
					<div className='col-12 col-md-6'>
                        <label htmlFor='locationId'>LocationId</label>
						<input
							className='form-control'
							type='text'
							name='locationId'
							id='locationId'
                            readOnly
							value={campsite.id}
							onChange={handleChange}
						/>
					</div>
					<div className=' col'>
						<label htmlFor='parkCode'>Park Code</label>
						<input
							className='form-control'
							type='text'
							name='parkCode'
							id='parkCode'
                            readOnly
							value={campsite.parkCode}
							onChange={handleChange}
						/>
					</div>
				</div>
                <div className='row mb-3'>
                    <div className='col'>
                            <label htmlFor='title'>Title</label>
                            <input
                                className='form-control'
                                type='text'
                                name='title'
                                id='title'
                                required
                                // value={review.title}
                                onChange={handleChange}
                            />
                        </div>
                </div>
                <div className='row mb-3'>
                    <div className='col'>
                            <label htmlFor='review'>Review</label>
                            <textarea id="review" name="review" type="text" className="form-control" required onChange={handleChange} />
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col'>
                            <label htmlFor='imgUrl'>Image URL</label>
                            <input
                                className='form-control'
                                type='text'
                                name='imgUrl'
                                id='imgUrl'
                                value={review.imgUrl}
                                onChange={handleChange}
                            />
                        </div>
                </div>
                 <div className="form-group">
                    <input type="file" id="theFile" accept="image/*" className="form-control" onChange={handleImgChange}/>
                </div>

                 {/* <div class="form-group">
                    <button className="btn btn-primary" id="btnUpload" onClick={handleUpload}>Upload</button>
                 </div> */}

                <div id="preview" className="form-group">
                    <img id="imgPreview"/>
                    {
                        // reviewId && review.imgUrl? ( <img id="imgPreview" src={review.imgUrl}/>): ( <img id="imgPreview"/>)
                    }
                    
                 </div>
				{errors.length > 0 && (
					<div className='alert alert-danger'>
						<p>Failed to save due to the following:</p>
						<ul>
							{errors.map(error => (
								<li key={error}>{error}</li>
							))}
						</ul>
					</div>
				)}
				<div>
					<button id = 'btnUpload' className='btn btn-primary me-2' type='submit'>
						Submit
					</button>
					<Link className='btn btn-secondary' to='/campsite'>
						Cancel
					</Link>
				</div>
			</form>
		</>
    );
}