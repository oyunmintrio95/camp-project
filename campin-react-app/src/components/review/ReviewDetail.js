import { useState, useContext, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

import '../../css/reviewDetail.css'


export default function ReviewDetail(){
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const campsite = location.state;
    const [review, setReview] = useState(null);
    const { reviewId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/api/review/"+reviewId)
        .then(res => res.json())
        .then(setReview)
        .catch(error => {
            //navigate to camp detail page
            navigate("/campsite")
        })

    },[]);

    return(
        <div className="container col-lg-6 col-sm-8  pb-4 rounded-2" id="reviewDetailBox">
            <div>
                {review &&<>
                    <div className="d-flex justify-content-between ">
                        <div className="mt-3">
                            <h2 className="ps-3"> &lt; {review.title} &gt;</h2>
                        </div>
                        {
                                user && (
                                    review &&(
                                        user.userId === review.appUserId&&
                                    <div className="d-flex justify-content-end mt-3">
                                        <div className="me-3">
                                            <Link className="btn" id="reviewEditBtn" to={`/review/edit/${reviewId}`} state={campsite}>Edit</Link>
                                        </div>
                                        <div>
                                            <Link className="btn" id="reviewDeleteBtn"  to={`/review/delete/${reviewId}`} state={campsite} >Delete</Link>
                                        </div>
                                    </div>
                                    )
                                )
                            }
                    </div>
                    <div className="d-flex align-items-end flex-column">
                        <div className="mt-3">
                            <div><span className="detailTitles">Author:</span> {review.author}</div>
                        </div>
                        <div className="mt-3">
                            <span className="detailTitles">Post Date</span>: {review.editDate !==null ? review.editDate: review.postDate}
                        </div>
                    </div>
                    <div className = "col d-flex justify-content-center mt-3">
                        {review.imgUrl&&
                            <img src={review.imgUrl} className="img-fluid rounded-3" 
                            style = {{height: 500, width:500, resizeMode : 'contain'}}></img>}
                    </div>
                    <div className="row d-flex justify-content-center p-2 mt-3 mb-3">
                        <div className="col-10 mb-2" id="reviewReview">
                            {review.review}

                        </div>
                    </div>
                    
                    
                    
                   

                </>
                



                }
            </div>
            
        </div>
    );
    
}