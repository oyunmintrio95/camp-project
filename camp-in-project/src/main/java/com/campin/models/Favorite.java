package com.campin.models;

import java.util.Objects;

public class Favorite {

    private int favoriteId;
    private String locationId;
    private String parkCode;
    private int appUserId;

    public int getFavoriteId() {
        return favoriteId;
    }

    public void setFavoriteId(int favoriteId) {
        this.favoriteId = favoriteId;
    }

    public String getLocationId() {
        return locationId;
    }

    public void setLocationId(String locationId) {
        this.locationId = locationId;
    }

    public int getAppUserId() {
        return appUserId;
    }

    public void setAppUserId(int appUserId) {
        this.appUserId = appUserId;
    }

    public String getParkCode() {
        return parkCode;
    }

    public void setParkCode(String parkCode) {
        this.parkCode = parkCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Favorite favorite = (Favorite) o;
        return favoriteId == favorite.favoriteId && appUserId == favorite.appUserId && Objects.equals(locationId, favorite.locationId) && Objects.equals(parkCode, favorite.parkCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(favoriteId, locationId, parkCode, appUserId);
    }
}
