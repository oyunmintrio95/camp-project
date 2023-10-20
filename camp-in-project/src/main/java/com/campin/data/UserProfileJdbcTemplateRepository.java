package com.campin.data;

import com.campin.data.mapper.UserProfileMapper;
import com.campin.models.UserProfile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class UserProfileJdbcTemplateRepository implements UserProfileRepository{
    private final JdbcTemplate jdbcTemplate;
    public UserProfileJdbcTemplateRepository(JdbcTemplate jdbcTemplate){this.jdbcTemplate = jdbcTemplate;}

    @Override
    public UserProfile findByAppUserId(int appUserId) {
        final String sql = """
                            select user_profile_id, app_user_id, first_name, last_name, description, dob, gender
                            from user_profile
                            where app_user_id = ?;
                            """;

        return jdbcTemplate.query(sql, new UserProfileMapper(), appUserId).stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public UserProfile findById(int userProfileId) {
        final String sql = """
                            select user_profile_id, app_user_id, first_name, last_name, description, dob, gender
                            from user_profile
                            where user_profile_id = ?;
                            """;

        return jdbcTemplate.query(sql, new UserProfileMapper(), userProfileId).stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public UserProfile add(UserProfile userProfile) {
        final String sql = """
                            insert into user_profile (app_user_id, first_name, last_name, description, dob, gender)
                            values ( ?, ?, ?, ?, ?, ?);
                            """;

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, userProfile.getAppUserId());
            ps.setString(2, userProfile.getFirstName());
            ps.setString(3, userProfile.getLastName());
            ps.setString(4, userProfile.getDescription());
            ps.setDate(5, userProfile.getDob() == null? null :Date.valueOf(userProfile.getDob()));
            ps.setString(6, userProfile.getGender());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0){
            return null;
        }

        userProfile.setUserProfileId(keyHolder.getKey().intValue());
        return userProfile;

    }

    @Override
    public boolean update(UserProfile userProfile) {
        final String sql = """
                    update user_profile set 
                    first_name = ?, last_name =?, description = ?, dob = ?, gender = ?
                    where user_profile_id = ?;
                """;

        return jdbcTemplate.update(sql,
                userProfile.getFirstName(),
                userProfile.getLastName(),
                userProfile.getDescription(),
                userProfile.getDob(),
                userProfile.getGender(),
                userProfile.getUserProfileId()) >0;
    }

    @Override
    public boolean deleteById(int userProfileId) {
        return jdbcTemplate.update(
                "delete from user_profile where user_profile_id = ?", userProfileId
        )>0;
    }
}
