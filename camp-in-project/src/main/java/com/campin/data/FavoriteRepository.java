package com.campin.data;

import com.campin.models.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

public interface FavoriteRepository{
    List<Favorite> findAll();
    List<Favorite> findByAppUserId(int appUserId);
    Favorite findById(int favoriteId);
    Favorite add(Favorite favorite);
    boolean update(Favorite favorite);
    boolean deleteById(int favoriteId);
}
