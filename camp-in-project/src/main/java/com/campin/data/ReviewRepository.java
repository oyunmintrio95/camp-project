package com.campin.data;

import com.campin.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository {
    Review findAll();
    Review
}
