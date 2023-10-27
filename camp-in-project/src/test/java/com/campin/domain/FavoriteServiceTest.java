package com.campin.domain;

import com.campin.data.FavoriteRepository;
import com.campin.models.Favorite;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyChar;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class FavoriteServiceTest {

    @Autowired
    FavoriteService service;

    @MockBean
    FavoriteRepository repository;

    @Test
    void shouldAdd(){
        Favorite favorite = makeFavorite();
        Favorite mockOut = makeFavorite();
        mockOut.setFavoriteId(1);

        when(repository.add(favorite)).thenReturn(mockOut);

        Result<Favorite> actual = service.add(favorite);
        assertEquals(ActionStatus.SUCCESS, actual.getStatus());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotAddNull(){
        Favorite favorite = null;
        Result<Favorite> actual = service.add(favorite);
        assertEquals(ActionStatus.INVALID, actual.getStatus());
    }

//    @Test
//    void shouldNotAddDuplicateFavorite(){
//        Favorite favorite = makeFavorite();
//        Result<Favorite> result = service.add(favorite);
//        assertEquals(ActionStatus.SUCCESS, result.getStatus());
//
//        Favorite favorite2 = makeFavorite();
//        Result<Favorite> actual = service.add(favorite2);
//        assertEquals(ActionStatus.INVALID, actual.getStatus());
//    }

    @Test
    void shouldNotAddInvalidFavorite(){
        Favorite favorite = makeFavorite();
        favorite.setLocationId("  ");
        Result<Favorite> actual = service.add(favorite);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        favorite = makeFavorite();
        favorite.setAppUserId(0);
        actual = service.add(favorite);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        favorite = makeFavorite();
        favorite.setParkCode(null);
        actual = service.add(favorite);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

    }

    Favorite makeFavorite(){
        Favorite favorite = new Favorite();
        favorite.setAppUserId(1);
        favorite.setLocationId("location1");
        favorite.setParkCode("amid");
        return favorite;
    }

}