package com.campin.domain;

import com.campin.data.FavoriteRepository;
import com.campin.models.Favorite;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {

    private FavoriteRepository repository;
    public FavoriteService(FavoriteRepository repository){
        this.repository = repository;
    }

    public List<Favorite> findAll(){
        return repository.findAll();
    }
    public List<Favorite> findByAppUserId(int appUserId){
        return repository.findByAppUserId(appUserId);
    }
    public Favorite findById(int favoriteId){
        return repository.findById(favoriteId);
    }

    public Favorite findByKey(int appUserId, String locationId){
        return repository.findByKey(appUserId, locationId);
    }
    public Result<Favorite> add(Favorite favorite){
        Result<Favorite> result = validate(favorite);

        if(!result.isSuccess()){
            return result;
        }

        if(favorite.getFavoriteId() != 0 ){
            result.addMessage("favoriteId must be set for `add` operation", ActionStatus.INVALID);
            return result;
        }

        favorite = repository.add(favorite);
        result.setPayload(favorite);
        return result;
    }
    public Result<Favorite> update(Favorite favorite){
        Result<Favorite> result = validate(favorite);

        if(!result.isSuccess()){
            return result;
        }

        if(favorite.getFavoriteId() <= 0){
            result.addMessage("favoriteId must be set for `update` operation", ActionStatus.INVALID);
            return result;
        }

        if(!repository.update(favorite)){
            String msg = String.format("favoriteId: %s, not found", favorite.getFavoriteId());
            result.addMessage(msg, ActionStatus.NOT_FOUND);
        }

        return result;

    }
    public boolean deleteById(int favoriteId){
        return repository.deleteById(favoriteId);
    }

    private Result<Favorite> validate(Favorite favorite){
        Result<Favorite> result = new Result<>();

        if(favorite == null){
            return null;
        }

        if(favorite.getAppUserId() == 0){
            result.addMessage("appUserId is required", ActionStatus.INVALID);
        }
        if(Validations.isNullORBlank(favorite.getLocationId())){
            result.addMessage("locationId is required", ActionStatus.INVALID);
        }
        if(isDuplicate(favorite)){
            result.addMessage("appUserId + locationId already exist", ActionStatus.INVALID);
        }

        return result;

    }

    private boolean isDuplicate(Favorite favorite){
        if(repository.findByKey(favorite.getAppUserId(), favorite.getLocationId()) != null){
            return true;
        }
        return false;
    }
}
