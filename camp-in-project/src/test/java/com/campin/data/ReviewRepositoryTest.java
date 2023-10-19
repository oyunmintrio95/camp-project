package com.campin.data;

import com.campin.models.Review;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ReviewRepositoryTest {


    @Autowired
    JdbcTemplate jdbcTemplate;

    @BeforeEach
    void setup(){
        jdbcTemplate.update("call set_known_good_state();");
    }


}