package com.campin.controllers;

import com.campin.domain.FavoriteService;
import com.campin.domain.Result;
import com.campin.models.Favorite;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorite")
public class FavoriteController {

    private final FavoriteService service;
    public FavoriteController(FavoriteService service){this.service = service;}

    @GetMapping
    public List<Favorite> findAll(){
        return service.findAll();
    }

    @GetMapping("/user/{appUserId}")
    public List<Favorite> findByAppUserId(@PathVariable int appUserId){
        return service.findByAppUserId(appUserId);

    }

//    @GetMapping("/{appUserId}/{locationId}")
    @RequestMapping(value = "/{appUserId}/{locationId}", method=RequestMethod.GET)
    public ResponseEntity<Favorite> findByKey(@PathVariable("appUserId") int appUserId,
                                              @PathVariable("locationId") String locationId){
        Favorite favorite = service.findByKey(appUserId, locationId);
        if(favorite == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(favorite, HttpStatus.OK);

    }

    @GetMapping("/{favoriteId}")
    public ResponseEntity<Favorite> findById(@PathVariable int favoriteId){
        Favorite favorite = service.findById(favoriteId);
        if(favorite == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(favorite);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Favorite favorite){
        Result<Favorite> result = service.add(favorite);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);

    }

    @DeleteMapping("/{favoriteId}")
    public ResponseEntity<Void> deleteById(@PathVariable int favoriteId){
        if(service.deleteById(favoriteId)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

}
