package com.campin.data;

import com.campin.data.mapper.ReviewMapper;
import com.campin.models.Review;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class ReviewJdbcTemplateRepository implements ReviewRepository{
    private final JdbcTemplate jdbcTemplate;

    public ReviewJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Review> findAll() {
        final String sql = """
                            select review_id, app_User_id, location_id, title, review, post_date, edit_date
                            from review;
                            """;
        return jdbcTemplate.query(sql, new ReviewMapper());
    }

    @Override
    public Review findById(int reviewId) {
        final String sql = """
                            select review_id, app_User_id, location_id, title, review, post_date, edit_date
                            from review
                            where review_id = ?;
                            """;
        return jdbcTemplate.query(sql, new ReviewMapper(),reviewId).stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public List<Review> findByAppUserId(int appUserId) {
        final String sql = """
                            select review_id, app_User_id, location_id, title, review, post_date, edit_date
                            from review
                            where app_user_id = ?;
                            """;
        return jdbcTemplate.query(sql, new ReviewMapper(),appUserId);
    }

    @Override
    public Review add(Review review) {
        final String sql = """
                            insert into review (app_user_id, location_id, title, review)
                            values ( ?, ?, ?, ?);
                            """;
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, review.getAppUserId());
            ps.setString(2, review.getLocationId());
            ps.setString(3, review.getTitle());
            ps.setString(4, review.getReview());
            return ps;
        }, keyHolder);

        if(rowAffected <= 0){
            return null;
        }
        review.setReviewId(keyHolder.getKey().intValue());
        return review;
    }

    @Override
    public boolean update(Review review) {
        final String sql = """
                    update review set 
                    title = ?, review =?, edit_date = ?
                    where review_id = ?;
                """;
        return jdbcTemplate.update(sql,
                review.getTitle(),
                review.getReview(),
                review.getEditDate(),
                review.getReviewId())>0;
    }

    @Override
    public boolean deleteById(int reviewId) {
        return jdbcTemplate.update("delete from review where review_id =?", reviewId) >0;
    }
}
