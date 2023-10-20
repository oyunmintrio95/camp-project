package com.campin.data;

import com.campin.models.Camp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class CampJdbcTemplateRepositoryTest {
    @Autowired
    CampJdbcTemplateRepository repository;
    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup(){knownGoodState.set();}

    @Test
    void shouldFindAll(){
        List<Camp> campList = repository.findAll();
        assertEquals(2, campList.size());
    }

    @Test
    void shouldFindByAppUserId(){
        List<Camp> campList = repository.findByAppUserId(1);
        assertEquals(1, campList.size());

        campList = repository.findByAppUserId(99);
        assertEquals(0, campList.size());

    }

    @Test
    void shouldFindById(){
        Camp camp = repository.findById(1);
        assertEquals(1, camp.getAppuserId());

        camp = repository.findById(99);
        assertNull(camp);

    }

    @Test
    void shouldAdd(){
        Camp camp = makeCamp();
        Camp actual = repository.add(camp);
        assertNotNull(actual);
        assertEquals(3, actual.getCampId());

    }

    @Test
    void shouldUpdate(){
        Camp camp = makeCamp();
        camp.setCampId(1);
        assertTrue(repository.update(camp));

        camp.setCampId(99);
        assertFalse(repository.update(camp));
    }

    @Test
    void shouldDeleteById(){
        assertTrue(repository.deleteById(2));
        assertFalse(repository.deleteById(99));

    }

    Camp makeCamp(){
        Camp camp = new Camp();
        camp.setStartDate(LocalDate.of(2023,11,12));
        camp.setEndDate(LocalDate.of(2023,11,15));
        camp.setTitle("Camp 1");
        camp.setNumOfPeople(4);
        camp.setPost("Let's camp and barbecue together");
        camp.setAppuserId(1);
        camp.setLocationId("location 1");
        return camp;
    }

}