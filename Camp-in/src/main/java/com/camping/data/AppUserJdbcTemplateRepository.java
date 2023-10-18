package com.camping.data;

import com.camping.data.mapper.AppUserMapper;
import com.camping.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public class AppUserJdbcTemplateRepository implements AppUserRepository {
    private final JdbcTemplate jdbcTemplate;

    public AppUserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional
    public AppUser findByUsername(String username) {

        String sql = """
                select 
                     u.app_user_id,
                     u.username,
                     u.password_hash,
                     u.enabled
                from app_user u
                where u.username = ?;
                """;
        return jdbcTemplate.query(sql, new AppUserMapper(getAuthorities(username)), username).stream()
                .findFirst().orElse(null);
    }

    @Override
    public AppUser add(AppUser appUser) {
        return null;
    }

    private List<String> getAuthorities(String username) {
        return List.of("USER");
    }
}
