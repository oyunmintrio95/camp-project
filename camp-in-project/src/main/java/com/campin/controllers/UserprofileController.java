package com.campin.controllers;

import com.campin.domain.Result;
import com.campin.domain.UserProfileService;
import com.campin.models.UserProfile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/userprofile")
public class UserprofileController {

    private final UserProfileService service;

    public UserprofileController(UserProfileService service){this.service = service;}

    @GetMapping("/{userProfileId}")
    public ResponseEntity<UserProfile> findById(@PathVariable int userProfileId){
        UserProfile userProfile = service.findById(userProfileId);
        if(userProfile == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(userProfile);
    }

    @GetMapping("/user/{appUserId}")
    public ResponseEntity<UserProfile> findByAppUserId(@PathVariable int appUserId){
        UserProfile userProfile = service.findByAppUserId(appUserId);
        if(userProfile == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(userProfile);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody UserProfile userProfile){
        Result<UserProfile> result = service.add(userProfile);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{userProfileId}")
    public ResponseEntity<Object> update(@PathVariable int userProfileId, @RequestBody UserProfile userProfile) {
        if (userProfileId != userProfile.getUserProfileId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<UserProfile> result = service.update(userProfile);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{userProfileId}")
    public ResponseEntity<Void> deleteById(@PathVariable int userProfileId){
        if(service.deleteById(userProfileId)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
