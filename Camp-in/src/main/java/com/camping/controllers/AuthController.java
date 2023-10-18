package com.camping.controllers;

import com.camping.domain.Result;
import com.camping.models.AppUser;
import com.camping.security.AppUserService;
import com.camping.security.JwtConverter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@ConditionalOnWebApplication
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtConverter converter;
    private final AppUserService appUserService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtConverter converter,
                          AppUserService appUserService) {
        this.authenticationManager = authenticationManager;
        this.converter = converter;
        this.appUserService = appUserService;
    }

    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials){
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                credentials.get("username"), credentials.get("password")
        );

        Authentication authentication = authenticationManager.authenticate(authToken);
        if(authentication.isAuthenticated()){
            AppUser appUser = (AppUser) authentication.getPrincipal();
            String jwt = converter.getTokenFromUser(appUser);
            Map<String, String> result = new HashMap<>();
            result.put("jwt_token", jwt);
            return ResponseEntity.ok(result);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);

    }

    @PostMapping("/api/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> credentials) {
        Result<AppUser> result = appUserService.add(
                credentials.get("username"), credentials.get("password"));
        if (result.isSuccess()) {
            Map<String, Integer> userId = new HashMap<>();
            userId.put("user_id", result.getPayload().getAppUserId());
            return ResponseEntity.ok(userId);
        }
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

}
