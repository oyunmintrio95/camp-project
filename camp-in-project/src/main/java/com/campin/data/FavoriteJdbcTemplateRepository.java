package com.campin.data;

import com.campin.data.mapper.FavoriteMapper;
import com.campin.models.Favorite;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class FavoriteJdbcTemplateRepository implements FavoriteRepository {

    private final JdbcTemplate jdbcTemplate;

    public FavoriteJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Favorite> findAll() {
        final String sql = """
                    select favorite_id, location_id, app_user_id
                    from favorite;
                """;
        return jdbcTemplate.query(sql, new FavoriteMapper());
    }

    @Override
    public List<Favorite> findByAppUserId(int appUserId) {
        final String sql = """
                    select favorite_id, location_id, app_user_id
                    from favorite
                    where app_user_id = ?;
                """;
        return jdbcTemplate.query(sql, new FavoriteMapper(), appUserId);
    }

    @Override
    public Favorite findById(int favoriteId) {
        final String sql = """
                    select favorite_id, location_id, app_user_id
                    from favorite
                    where favorite_id = ?;
                """;
        return jdbcTemplate.query(sql, new FavoriteMapper(), favoriteId).stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public Favorite findByKey(int appUserId, String locationId) {
        final String sql = """
                    select favorite_id, location_id, app_user_id
                    from favorite
                    where app_user_id = ? and location_id = ?;
                """;
        return jdbcTemplate.query(sql, new FavoriteMapper(), appUserId, locationId).stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public Favorite add(Favorite favorite) {
        final String sql = """
                            insert into favorite (app_user_id, location_id)
                            values (?, ?);
                            """;
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, favorite.getAppUserId());
            ps.setString(2, favorite.getLocationId());
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0){
            return null;
        }
        favorite.setFavoriteId(keyHolder.getKey().intValue());
        return favorite;
    }

    @Override
    public boolean update(Favorite favorite) {
        return false;
    }

    @Override
    public boolean deleteById(int favoriteId) {
        return jdbcTemplate.update(
                "delete from favorite where favorite_id = ?", favoriteId
        )>0;
    }
}
