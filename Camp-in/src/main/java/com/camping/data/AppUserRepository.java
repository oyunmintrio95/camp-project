package com.camping.data;

import com.camping.models.AppUser;

public interface AppUserRepository {
    AppUser findByUsername(String username);

    AppUser add(AppUser appUser);
}
