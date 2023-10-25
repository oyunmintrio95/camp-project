package com.campin.data;

import com.campin.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository {
    List<Review> findAll();
    Review findById(int reviewId);
    List<Review> findByAppUserId(int appUserId);
    List<Review> findByLocationId(String locationId);
    Review add(Review review);
    boolean update(Review review);
    boolean deleteById(int reviewId);
}
