package com.campin.security;

import com.campin.data.AppUserRepository;
import com.campin.domain.ActionStatus;
import com.campin.domain.Result;
import com.campin.models.AppUser;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserService implements UserDetailsService {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    public AppUserService(AppUserRepository appUserRepository, PasswordEncoder passwordEncoder) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AppUser findByUsername(String username){
        AppUser appUser = appUserRepository.findByUsername(username);

        if(appUser == null || !appUser.isEnabled()){
            throw new UsernameNotFoundException(String.format("%s not found.", username));
        }

        return appUser;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByUsername(username);

        if(appUser == null || !appUser.isEnabled()){
            throw new UsernameNotFoundException(String.format("%s not found.", username));
        }

        return appUser;

    }

    public Result<AppUser> add(String username, String password){
        Result<AppUser> result = validate(username, password);
        if (!result.isSuccess()){
            return result;
        }
        password = passwordEncoder.encode(password);
        System.out.println("encoded password: " + password);

        AppUser appUser = new AppUser(0, username, password, true, List.of("USER"));

        result.setPayload(appUserRepository.add(appUser));

        return result;

    }
    private Result<AppUser> validate(String username, String password) {
        Result<AppUser> result = new Result<>();

        if (username == null || username.isBlank()) {
            result.addMessage("username is required", ActionStatus.INVALID);
        }

        if (password == null || password.isBlank()) {
            result.addMessage("password is required", ActionStatus.INVALID);
        }

        if (!result.isSuccess()) {
            return result;
        }

        if (username.length() > 50) {
            result.addMessage("username must be 50 characters max", ActionStatus.INVALID);
        }

        if (!validatePassword(password)) {
            result.addMessage("password must be at least 8 character and contain a digit, a letter, and a non-digit/non-letter", ActionStatus.INVALID);
        }

        if (!result.isSuccess()) {
            return result;
        }

        try {
            if (loadUserByUsername(username) != null) {
                result.addMessage("the provided username already exists", ActionStatus.INVALID);
            }
        } catch (UsernameNotFoundException e) {
            // good!
        }

        return result;
    }

    private boolean validatePassword(String password) {
        if (password.length() < 8) {
            return false;
        }

        int digits = 0;
        int letters = 0;
        int others = 0;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            } else {
                others++;
            }
        }

        return digits > 0 && letters > 0 && others > 0;
    }


}
