package com.campin.data.mapper;

import com.campin.models.Review;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReviewMapper implements RowMapper<Review> {

    @Override
    public Review mapRow(ResultSet rs, int rowNum) throws SQLException {
        Review review = new Review();
        review.setReviewId(rs.getInt("review_id"));
        review.setAppUserId(rs.getInt("app_user_id"));
        review.setLocationId(rs.getString("location_id"));
        review.setTitle(rs.getString("title"));
        review.setReview(rs.getString("review"));
        review.setPostDate(rs.getTimestamp("post_date").toLocalDateTime());
        review.setEditDate(rs.getTimestamp("edit_date").toLocalDateTime());
        return review ;
    }
}
