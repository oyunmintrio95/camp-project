package com.campin.data.mapper;

import com.campin.models.UserProfile;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserProfileMapper implements RowMapper<UserProfile> {

    @Override
    public UserProfile mapRow(ResultSet rs, int rowNum) throws SQLException {
        UserProfile userProfile = new UserProfile();
        userProfile.setUserProfileId(rs.getInt("user_profile_id"));
        userProfile.setAppUserId(rs.getInt("app_user_id"));
        userProfile.setFirstName(rs.getString("first_name"));
        userProfile.setLastName(rs.getString("last_name"));
        userProfile.setDescription(rs.getString("description"));
        if(rs.getDate("dob") != null){
            userProfile.setDob(rs.getDate("dob").toLocalDate());
        }
        userProfile.setGender(rs.getString("gender"));
        return userProfile;

    }
}
