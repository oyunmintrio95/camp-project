package com.campin.domain;

import com.campin.data.ReviewRepository;
import com.campin.models.Review;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ReviewServiceTest {

    @Autowired
    ReviewService service;

    @MockBean
    ReviewRepository repository;

    @Test
    void shouldAdd(){
        Review review = makeReview();
        Review mockOut = makeReview();
        mockOut.setReviewId(1);

        when(repository.add(review)).thenReturn(mockOut);

        Result<Review> actual = service.add(review);
        assertEquals(ActionStatus.SUCCESS, actual.getStatus());
        assertEquals(mockOut, actual.getPayload());

    }

    @Test
    void shouldNotAddNull(){
        Review review = null;
        Result<Review> actual = service.add(review);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

    }

    @Test
    void shouldNotAddInvalid(){
        Review review = makeReview();
        review.setAuthor("   ");
        Result<Review> actual = service.add(review);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        review = makeReview();
        review.setAppUserId(0);
        actual = service.add(review);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        review = makeReview();
        review.setLocationId(null);
        actual = service.add(review);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        review = makeReview();
        review.setTitle("   ");
        actual = service.add(review);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        review = makeReview();
        review.setTitle("abcefghigklmnopqrstuvwxyzd;alfjldskjabcefghigklmnopqrstuvwxyzd;alfjldskjabcefghigklmnopqrstuvwxyzd;alfjldskjabcefghigklmnopqrstuvwxyzd;alfjldskjabcefghigklmnopqrstuvwxyzd;alfjldskjabcefghigklmnopqrstuvwxyzd;alfj" +
                "ldskjabcefghigklmnopqrstuvwxyzd;alfjldskjabcefghigklmnopqrstuvwxyzd;alfjldskjabcefghigklmnopqrstuvwxyzd;alfjldskj");
        actual = service.add(review);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        review = makeReview();
        review.setReview("   ");
        actual = service.add(review);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        review = makeReview();
        review.setParkCode(null);
        actual = service.add(review);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

    }

    @Test
    void shouldNotUpdateNull(){
        Review review = null;

        Result<Review> actual = service.update(review);
        assertEquals(ActionStatus.INVALID, actual.getStatus());


    }

    @Test
    void shouldUpdate(){
        Review review = makeReview();
        review.setReviewId(1);

        when(repository.update(review)).thenReturn(true);

        Result<Review> actual = service.update(review);
        assertEquals(ActionStatus.SUCCESS, actual.getStatus());

    }

    @Test
    void shouldNotUpdateInvalid(){
        Review review = makeReview();
        Result<Review> actual = service.update(review);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        review = makeReview();
        review.setAppUserId(0);
        actual = service.update(review);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        review = makeReview();
        review.setLocationId(null);
        actual = service.update(review);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        review = makeReview();
        review.setTitle("   ");
        actual = service.update(review);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        review = makeReview();
        review.setTitle("abcefghigklmnopqrstuvwxyzd;alfjldskjabcefghigklmnopqrstuvwxyzd;alfjldskjabcefghigklmnopqrstuvwxyzd;alfjldskjabcefghigklmnopqrstuvwxyzd;alfjldskjabcefghigklmnopqrstuvwxyzd;alfjldskjabcefghigklmnopqrstuvwxyzd;alfj" +
                "ldskjabcefghigklmnopqrstuvwxyzd;alfjldskjabcefghigklmnopqrstuvwxyzd;alfjldskjabcefghigklmnopqrstuvwxyzd;alfjldskj");
        actual = service.update(review);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        review = makeReview();
        review.setReview("   ");
        actual = service.update(review);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        review = makeReview();
        review.setParkCode(null);
        actual = service.update(review);
        assertEquals(ActionStatus.INVALID, actual.getStatus());


    }

    Review makeReview(){
        Review review = new Review();
        review.setAppUserId(1);
        review.setLocationId("location 1");
        review.setTitle("title 1");
        review.setReview("review 1");
        review.setImgUrl("image_url1");
        review.setParkCode("pach");
        review.setAuthor("john@smith.com");
        return review;
    }

}