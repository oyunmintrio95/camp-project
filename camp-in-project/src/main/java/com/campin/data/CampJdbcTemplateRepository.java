package com.campin.data;

import com.campin.data.mapper.CampMapper;
import com.campin.models.AppUser;
import com.campin.models.Camp;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class CampJdbcTemplateRepository implements CampRepository{

    private final JdbcTemplate jdbcTemplate;

    public CampJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Camp> findAll() {
        final String sql = """
                            select camp_id, app_user_id, location_id, num_of_people, 
                            start_date, end_date, title, post, post_date, edit_date, status
                            from camp;
                            """;
        return jdbcTemplate.query(sql, new CampMapper());
    }

    @Override
    public List<Camp> findByAppUserId(int appUserId) {
        final String sql = """
                            select camp_id, app_user_id, location_id, num_of_people, 
                            start_date, end_date, title, post, post_date, edit_date, status
                            from camp
                            where app_user_id = ?;
                            """;
        return jdbcTemplate.query(sql, new CampMapper(),appUserId);
    }

    @Override
    public Camp findById(int campId) {
        final String sql = """
                            select camp_id, app_user_id, location_id, num_of_people, 
                            start_date, end_date, title, post, post_date, edit_date, status
                            from camp
                            where camp_id = ?;
                            """;
        return jdbcTemplate.query(sql, new CampMapper(), campId).stream()
                .findFirst().orElse(null);
    }

    @Override
    public Camp add(Camp camp) {
        final String sql = """
                            insert into camp (app_user_id, location_id, num_of_people, start_date, end_date, title, post )
                            values (?, ?, ?, ?, ?, ?, ?)
                            """;
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, camp.getAppuserId());
            ps.setString(2, camp.getLocationId());
            ps.setInt(3, camp.getNumOfPeople());
            ps.setDate(4, Date.valueOf(camp.getStartDate()));
            ps.setDate(5, Date.valueOf(camp.getEndDate()));
            ps.setString(6, camp.getTitle());
            ps.setString(7, camp.getPost());
            return ps;
        }, keyHolder);

        if (rowAffected <= 0){
            return null;
        }

        camp.setCampId(keyHolder.getKey().intValue());
        return camp;
    }

    @Override
    public boolean update(Camp camp) {
       final String sql = """
                            update camp set
                            num_of_people = ?, start_date = ?, end_date = ?, 
                            title = ?, post = ?, edit_date = ?
                            where camp_id = ?;
                            """;
       return jdbcTemplate.update(sql,
               camp.getNumOfPeople(),
               camp.getStartDate(),
               camp.getEndDate(),
               camp.getTitle(),
               camp.getPost(),
               camp.getEditDate(),
               camp.getCampId()) >0;
    }

    @Override
    public boolean deleteById(int campId) {
        return jdbcTemplate.update("delete from camp where camp_id =?", campId) >0;
    }
}
