package com.campin.domain;

import com.campin.data.UserProfileRepository;
import com.campin.models.UserProfile;
import org.apache.catalina.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class UserProfileServiceTest {

    @Autowired
    UserProfileService service;

    @MockBean
    UserProfileRepository repository;

    @Test
    void shouldAdd(){
        UserProfile profile = makeUserProfile();
        UserProfile mockOut = makeUserProfile();
        mockOut.setUserProfileId(1);

        when(repository.add(profile)).thenReturn(mockOut);

        Result<UserProfile> actual = service.add(profile);
        assertEquals(ActionStatus.SUCCESS, actual.getStatus());
        assertEquals(mockOut, actual.getPayload());

    }

    @Test
    void shouldNotAddNull(){
        UserProfile profile = null;
        Result<UserProfile> actual = service.add(profile);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

    }

    @Test
    void shouldNotAddInvalid(){
        UserProfile profile = makeUserProfile();
        profile.setFirstName("  ");
        Result<UserProfile> actual = service.add(profile);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        profile = makeUserProfile();
        profile.setLastName(null);
        actual = service.add(profile);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        profile = makeUserProfile();
        profile.setDescription(null);
        actual = service.add(profile);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        profile = makeUserProfile();
        profile.setAppUserId(0);
        actual = service.add(profile);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

    }

    @Test
    void shouldUpdate(){
        UserProfile profile = makeUserProfile();
        profile.setUserProfileId(1);

        when(repository.update(profile)).thenReturn(true);

        Result<UserProfile> result = service.update(profile);
        assertEquals(ActionStatus.SUCCESS, result.getStatus());

    }

    @Test
    void shouldNotUpdateNull(){
        UserProfile profile = null;
        Result<UserProfile> actual = service.update(profile);
        assertEquals(ActionStatus.INVALID, actual.getStatus());
    }

    @Test
    void shouldNotUpdateInvalid(){
        UserProfile profile = makeUserProfile();
        profile.setLastName(null);
        Result<UserProfile> actual = service.update(profile);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        profile = makeUserProfile();
        profile.setFirstName(null);
        actual = service.update(profile);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        profile = makeUserProfile();
        profile.setDescription(null);
        actual = service.update(profile);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

        profile = makeUserProfile();
        profile.setAppUserId(0);
        actual = service.update(profile);
        assertEquals(ActionStatus.INVALID, actual.getStatus());

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