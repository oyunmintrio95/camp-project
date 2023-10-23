package com.campin.domain;

import com.campin.data.CampRepository;
import com.campin.models.Camp;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CampService {

    private CampRepository repository;
    public CampService(CampRepository repository){
        this.repository = repository;
    }

    public List<Camp> findAll(){
        return repository.findAll();
    }
    public List<Camp> findByAppUserId(int appUserId){
        return repository.findByAppUserId(appUserId);
    }
    public Camp findById(int campId){
        return repository.findById(campId);
    }
    public Result<Camp> add(Camp camp){
        Result<Camp> result = validate(camp);
        if(!result.isSuccess()){
            return result;
        }
        if(camp.getCampId() != 0){
            result.addMessage("campId must be set for `add` operation", ActionStatus.INVALID);
            return result;
        }

        camp = repository.add(camp);
        result.setPayload(camp);
        return result;

    }
    public Result<Camp> update(Camp camp){
        //TODO: setEditDate()
        //TODO: can only update future camping.
        Result<Camp> result = validate(camp);
        if(camp.getStartDate().isBefore(LocalDate.now())){
            result.addMessage("cannot cancel past camping.", ActionStatus.INVALID);
        }

        if(!result.isSuccess()){
            return result;
        }

        if(camp.getCampId() <= 0){
            result.addMessage("campId must be set for `update` operation", ActionStatus.INVALID);
            return result;
        }

        camp.setEditDate(LocalDateTime.now());

        if(!repository.update(camp)){
            String msg = String.format("campId: %s, not found", camp.getCampId());
            result.addMessage(msg, ActionStatus.NOT_FOUND);
        }

        return result;
    }

    public Result<Camp> deleteById(int campId){
        // TODO: should I add transactional for this?
        // TODO: can only delete future camping
        Result<Camp> result = new Result<>();
        Camp camp = repository.findById(campId);
        if(camp.getStartDate().isBefore(LocalDate.now())){
            result.addMessage("cannot cancel past camping.", ActionStatus.INVALID);
        }

        repository.deleteById(campId);
        return result;
    }

    private Result<Camp> validate(Camp camp){
        Result<Camp> result = new Result<>();

        if(camp == null){
            result.addMessage("camp cannot be null", ActionStatus.INVALID);
            return result;
        }
        if(camp.getAppuserId() == 0){
            result.addMessage("appUserId is required", ActionStatus.INVALID);
        }
        if(camp.getNumOfPeople() <= 0){
            result.addMessage("numOfPeople should be larger than 0", ActionStatus.INVALID);
        }
        if(Validations.isNullORBlank(camp.getTitle())){
            result.addMessage("title is required.", ActionStatus.INVALID);
        }
        if(camp.getTitle().length() > 250){
            result.addMessage("title is too long", ActionStatus.INVALID);
        }
        if(Validations.isNullORBlank(camp.getPost())){
            result.addMessage("post is required", ActionStatus.INVALID);
        }
        if(Validations.isNullORBlank(camp.getLocationId())){
            result.addMessage("locationId is required", ActionStatus.INVALID);
        }
        if(camp.getStartDate() == null){
            result.addMessage("start date is required.", ActionStatus.INVALID);
        }
        if(camp.getStartDate().isBefore(LocalDate.now())){
            result.addMessage("start date should be future.", ActionStatus.INVALID);
        }
        if(camp.getEndDate() == null){
            result.addMessage("end date is required.", ActionStatus.INVALID);
        }
        if(!camp.getEndDate().isAfter(camp.getStartDate()) || !camp.getEndDate().isAfter(LocalDate.now())){
            result.addMessage("end date should be future", ActionStatus.INVALID);
        }
        return result;

    }
}
