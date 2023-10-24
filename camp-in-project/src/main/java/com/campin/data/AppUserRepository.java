package com.campin.data;

import com.campin.models.AppUser;
import org.springframework.transaction.annotation.Transactional;

public interface AppUserRepository {
    @Transactional
    AppUser findByUsername(String username);

    @Transactional
    AppUser add(AppUser appUser);
    @Transactional
    boolean update(AppUser user);
}
