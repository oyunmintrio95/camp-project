package com.campin.data;

import com.campin.models.CampAppUser;

public interface CampAppUserRepository {
    boolean add(CampAppUser campAppUser);
    boolean update(CampAppUser campAppUser);
    boolean deleteByKey(int campId, int appUserId);
}
