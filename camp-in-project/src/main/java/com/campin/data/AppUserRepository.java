package com.campin.data;

import com.campin.models.AppUser;

public interface AppUserRepository {
    AppUser findByUsername(String username);

    AppUser add(AppUser appUser);
}
