package com.campin.data;

import com.campin.models.Camp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CampRepository {
    List<Camp> findAll();
    List<Camp> findByAppUserId(int appUserId);
    Camp findById(int campId);
    Camp add(Camp camp);
    boolean update(Camp camp);
    boolean deleteById(int campId);
}
