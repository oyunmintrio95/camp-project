package com.campin.data.mapper;

import com.campin.models.Camp;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalTime;


public class CampMapper implements RowMapper<Camp> {


    @Override
    public Camp mapRow(ResultSet rs, int rowNum) throws SQLException {
        Camp camp = new Camp();
        camp.setCampId(rs.getInt("camp_id"));
        camp.setAppuserId(rs.getInt("app_user_id"));
        camp.setLocationId(rs.getString("location_id"));
        camp.setNumOfPeople(rs.getInt("num_of_people"));
        camp.setStartDate(rs.getDate("start_date").toLocalDate());
        camp.setEndDate(rs.getDate("end_date").toLocalDate());
        camp.setTitle(rs.getString("title"));
        camp.setPost(rs.getString("post"));
        camp.setPostDate(rs.getTimestamp("post_date").toLocalDateTime());
        camp.setEditDate(rs.getTimestamp("edit_date").toLocalDateTime());
        camp.setStatus(rs.getString("status"));
        return camp;
    }
}
