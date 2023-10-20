package com.campin.data;

import com.campin.models.Review;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ReviewJdbcTemplateRepositoryTest {

    @Autowired
    ReviewJdbcTemplateRepository repository;
    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup(){knownGoodState.set();}

    @Test
    void shouldFindAll(){
        List<Review> reviews = repository.findAll();
        assertEquals(2, reviews.size());

    }

    @Test
    void shouldFindById(){
        Review review = repository.findById(1);
        assertEquals(1, review.getAppUserId());

        review = repository.findById(99);
        assertNull(review);

    }

    @Test
    void shouldFindByAppUserId(){
        List<Review> reviews = repository.findByAppUserId(2);
        assertEquals(1, reviews.size());

        reviews = repository.findByAppUserId(99);
        assertEquals(0, reviews.size());

    }

    @Test
    void shouldAdd(){
        Review review = makeReview();
        Review actual = repository.add(review);
        assertNotNull(actual);
        assertEquals(1, actual.getAppUserId());

    }

    @Test
    void shouldUpdate(){
        Review review = makeReview();
        review.setReviewId(1);
        review.setEditDate(LocalDateTime.now());
        assertTrue(repository.update(review));
        review.setReviewId(99);
        assertFalse(repository.update(review));

    }

    @Test
    void shouldDelete(){
        assertTrue(repository.deleteById(1));
        assertFalse(repository.deleteById(99));
    }

    Review makeReview(){
        Review review = new Review();
        review.setAppUserId(1);
        review.setLocationId("location 1");
        review.setTitle("title 1");
        review.setReview("review 1");
        return review;
    }

}