package com.campin.data;

import com.campin.models.UserProfile;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class UserProfileJdbcTemplateRepositoryTest {

    @Autowired
    UserProfileJdbcTemplateRepository repository;
    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup(){knownGoodState.set();}

    @Test
    void shouldFindByAppUserId(){
        UserProfile userProfile = repository.findByAppUserId(1);
        assertEquals("John", userProfile.getFirstName());

        userProfile = repository.findByAppUserId(99);
        assertNull(userProfile);

    }

    @Test
    void shouldFindById(){
        UserProfile userProfile = repository.findById(1);
        assertEquals("John", userProfile.getFirstName());

        userProfile = repository.findById(99);
        assertNull(userProfile);

    }

    @Test
    void shouldAdd(){
        UserProfile userProfile = makeUserProfile();
        UserProfile actual = repository.add(userProfile);
        assertNotNull(actual);
        assertEquals(3, actual.getUserProfileId());

    }
    @Test
    void shouldUpdate(){
        UserProfile userProfile = makeUserProfile();
        userProfile.setUserProfileId(1);
        assertTrue(repository.update(userProfile));
        userProfile.setUserProfileId(99);
        assertFalse(repository.update(userProfile));

    }
    @Test
    void shouldDeleteById(){
        assertTrue(repository.deleteById(1));
        assertFalse(repository.deleteById(99));

    }

    UserProfile makeUserProfile(){
        UserProfile userProfile = new UserProfile();
        userProfile.setAppUserId(1);
        userProfile.setFirstName("James");
        userProfile.setLastName("Bond");
        userProfile.setDescription("I'm a good person.");
        userProfile.setDob(LocalDate.of(1980, 4, 20));
        userProfile.setGender("Male");
        return userProfile;
    }
}