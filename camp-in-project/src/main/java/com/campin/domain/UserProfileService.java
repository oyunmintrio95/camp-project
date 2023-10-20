package com.campin.domain;

import com.campin.data.UserProfileRepository;
import com.campin.models.UserProfile;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    private final UserProfileRepository repository;

    public UserProfileService(UserProfileRepository repository) {this.repository = repository;}

    public UserProfile findByAppUserId(int appUserId){
        return repository.findByAppUserId(appUserId);

    }

    public UserProfile findById(int userProfileId){
        return repository.findById(userProfileId);
    }

    public Result<UserProfile> add(UserProfile userProfile){
        Result<UserProfile> result = validate(userProfile);
        if(!result.isSuccess()){
            return result;
        }

        if(userProfile.getUserProfileId() != 0){
            result.addMessage("userProfileId must be set for `add` operation", ActionStatus.INVALID);
            return result;
        }

        userProfile = repository.add(userProfile);
        result.setPayload(userProfile);
        return result;
    }

    public Result<UserProfile> update(UserProfile userProfile){
        Result<UserProfile> result = validate(userProfile);
        if(!result.isSuccess()){
            return result;
        }

        if(userProfile.getUserProfileId() <= 0){
            result.addMessage("userProfileId must be set for `update` operation", ActionStatus.INVALID);
            return result;
        }

        if(!repository.update(userProfile)){
            String msg = String.format("userProfileId: %s, not found", userProfile.getUserProfileId());
            result.addMessage(msg, ActionStatus.NOT_FOUND);
        }

        return result;

    }
    public boolean deleteById(int userProfileId){
        return repository.deleteById(userProfileId);
    }

    private Result<UserProfile> validate(UserProfile userProfile){
        Result<UserProfile> result = new Result<>();

        if(userProfile == null){
            result.addMessage("userprofile cannot be null", ActionStatus.INVALID);
            return result;
        }

        if(Validations.isNullORBlank(userProfile.getFirstName())){
            result.addMessage("first name is required", ActionStatus.INVALID);
        }

        if(Validations.isNullORBlank(userProfile.getLastName())){
            result.addMessage("last name is required", ActionStatus.INVALID);
        }

        if(Validations.isNullORBlank(userProfile.getDescription())){
            result.addMessage("description is required", ActionStatus.INVALID);
        }

        if(userProfile.getDescription().length() >= 250){
            result.addMessage("the length of description should be under 250 characters.", ActionStatus.INVALID);
        }

        return result;
    }

}
