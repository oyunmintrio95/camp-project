package com.campin.controllers;

import com.campin.domain.Result;
import com.campin.domain.ReviewService;
import com.campin.models.Review;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import software.amazon.awssdk.core.sync.RequestBody;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/review")
public class ReviewController {
    private final ReviewService service;

    public ReviewController(ReviewService service){this.service = service;}

    @GetMapping
    public List<Review> findAll(){
        return service.findAll();
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<Review> findById(@PathVariable int reviewId){
        Review review = service.findById(reviewId);
        if(review == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(review);
    }

    @GetMapping("/user/{appUserId}")
    public List<Review> findByAppUserId(@PathVariable int appUserId){
        return service.findByAppUserId(appUserId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@org.springframework.web.bind.annotation.RequestBody Review review){
//        review.setAppUserId(review.getAppUserId());
        Result<Review> result = service.add(review);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> upload(MultipartFile file){
        try{
            S3Client s3 = S3Client
                    .builder()
                    .region(Region.US_EAST_1)
                    .build();

            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket("campen-joy-bucket")
                    .key(file.getOriginalFilename())
                    .build();

           PutObjectResponse response = s3.putObject(request,RequestBody.fromBytes(file.getBytes()));

            return new ResponseEntity<>(response.eTag(), HttpStatus.CREATED);
        }catch(IOException e){
            System.err.println(e.getMessage());
        }
        return new ResponseEntity(null, HttpStatus.UNPROCESSABLE_ENTITY);
    }


    @PutMapping("/{reviewId}")
    public ResponseEntity<Object> update(@PathVariable int reviewId, @RequestParam Review review){
        if(reviewId != review.getReviewId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Review> result = service.update(review);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteById(@PathVariable int reviewId){
        if(service.deleteById(reviewId)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
