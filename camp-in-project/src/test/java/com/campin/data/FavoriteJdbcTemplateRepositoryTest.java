package com.campin.data;

import com.campin.models.Favorite;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class FavoriteJdbcTemplateRepositoryTest {

    @Autowired
    FavoriteJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup(){knownGoodState.set();}

    @Test
    void shouldFind4Favoirtes(){
        List<Favorite> favoriteList = repository.findAll();
        assertEquals(4, favoriteList.size());
    }

    @Test
    void shouldFind2FavoritesbyAppUserId(){
        List<Favorite> favoriteList = repository.findByAppUserId(1);
        assertEquals(2, favoriteList.size());

        favoriteList = repository.findByAppUserId(99);
        assertEquals(0, favoriteList.size());

    }

    @Test
    void shouldFindByKey(){
        Favorite arg = repository.findByKey(1, "EA81BC45-C361-437F-89B8-5C89FB0D0F86");
        assertEquals(1, arg.getFavoriteId());
    }

    @Test
    void shouldFindByFavoriteId(){
        Favorite arg = repository.findById(1);
        assertEquals(1, arg.getAppUserId());

        arg = repository.findById(99);
        assertNull(arg);
    }

    @Test
    void shouldAdd(){
        Favorite favorite = makeFavorite();
        Favorite actual = repository.add(favorite);
        assertNotNull(actual);
        assertEquals(5, actual.getFavoriteId());
    }

    @Test
    void shouldDelete(){
        assertTrue(repository.deleteById(1));
        assertFalse(repository.deleteById(99));
    }

    Favorite makeFavorite(){
        Favorite favorite = new Favorite();
        favorite.setAppUserId(1);
        favorite.setLocationId("location1");
        return favorite;
    }


}