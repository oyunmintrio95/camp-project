package com.campin.domain;

import com.campin.data.ReviewRepository;
import com.campin.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository repository;

    public ReviewService(ReviewRepository repository){this.repository = repository;}

    public List<Review> findAll(){
        return repository.findAll();

    }
    public Review findById(int reviewId){
        return repository.findById(reviewId);
    }
    public List<Review> findByAppUserId(int appUserId){
        return repository.findByAppUserId(appUserId);
    }

    public List<Review> findByLocationId(String locationId){return repository.findByLocationId(locationId);}

    public Result<Review> add(Review review){
        Result<Review> result = validate(review);
        if(!result.isSuccess()){
            return result;
        }

        if(review.getReviewId() != 0){
            result.addMessage("reviewId must be set for `add` operation", ActionStatus.INVALID);
            return result;
        }

        review = repository.add(review);
        result.setPayload(review);
        return result;

    }
    public Result<Review> update(Review review){
        Result<Review> result = validate(review);

        if(!result.isSuccess()){
            return result;
        }

        if(review.getReviewId() <= 0){
            result.addMessage("reviewId must be set for `update` operation", ActionStatus.INVALID);
            return result;
        }

        review.setEditDate(LocalDateTime.now());

        if(!repository.update(review)){
            String msg = String.format("reviewId: %s, not found", review.getReviewId());
            result.addMessage(msg, ActionStatus.NOT_FOUND);
        }

        return result;
    }
    public boolean deleteById(int reviewId){
        return repository.deleteById(reviewId);

    }

    private Result<Review> validate(Review review){
        Result<Review> result = new Result<>();

        if(review == null){
            result.addMessage("review cannot be null", ActionStatus.INVALID);
            return result;
        }

        if(review.getAppUserId() == 0){
            result.addMessage("appUserId is required", ActionStatus.INVALID);
        }
        if(Validations.isNullORBlank(review.getAuthor())){
            result.addMessage("author is required", ActionStatus.INVALID);
        }
        if(Validations.isNullORBlank(review.getLocationId())){
            result.addMessage("locationId is required", ActionStatus.INVALID);
        }
        if(Validations.isNullORBlank(review.getTitle())){
            result.addMessage("title is required.", ActionStatus.INVALID);
            return result;
        }
        if(review.getTitle().length() > 250){
            result.addMessage("title is too long.", ActionStatus.INVALID);
        }
        if(Validations.isNullORBlank(review.getReview())){
            result.addMessage("review is required.", ActionStatus.INVALID);

        }
        if(Validations.isNullORBlank(review.getParkCode())){
            result.addMessage("review is required.", ActionStatus.INVALID);
        }

        return result;
    }


}
