package com.campin.data;

import com.campin.models.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository {
    UserProfile findByAppUserId(int appUserId);
    UserProfile findById(int userProfileId);
    UserProfile add(UserProfile userProfile);
    boolean update(UserProfile userProfile);
    boolean deleteByI(int userProfileId);
}
