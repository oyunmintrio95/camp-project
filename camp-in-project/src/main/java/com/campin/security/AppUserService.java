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

        AppUser appUser = new AppUser(0, username, password, true, List.of("USER"));

        try{
            appUser = appUserRepository.add(appUser);
            result.setPayload(appUser);
        }catch (DuplicateKeyException e){
            result.addMessage(ActionStatus.INVALID, "The provided username already exists");
        }

        return result;

    }
    private Result<AppUser> validate(String username, String password) {
        Result<AppUser> result = new Result<>();
        if (username == null || username.isBlank()) {
            result.addMessage(ActionStatus.INVALID, "username is required");
            return result;
        }

        if (password == null) {
            result.addMessage(ActionStatus.INVALID, "password is required");
            return result;
        }

        if (username.length() > 50) {
            result.addMessage(ActionStatus.INVALID, "username must be less than 50 characters");
        }

        if (!isValidPassword(password)) {
            result.addMessage(ActionStatus.INVALID,
                    "password must be at least 8 character and contain a digit," +
                            " a letter, and a non-digit/non-letter");
        }

        return result;
    }

    private boolean isValidPassword(String password){
        if(password.length() < 8){
            return false;
        }

        int digits = 0;
        int letters = 0;
        int others = 0;
        for(char c: password.toCharArray()){
            if(Character.isDigit(c)){
                digits++;
            }else if(Character.isLetter(c)){
                letters++;
            }else{
                others++;
            }
        }
        return digits > 0 && letters > 0 && others > 0;
    }


}