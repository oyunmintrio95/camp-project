package com.campin.models;

import jdk.jfr.Enabled;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;


public class Review {
    private int reviewId;
    private int appUserId;
    private String locationId;
    private String title;
    private String review;
    private String author;
    private String parkCode;
    private LocalDateTime postDate;
    private LocalDateTime editDate;
    private String imgUrl;

    public int getReviewId() {
        return reviewId;
    }

    public void setReviewId(int reviewId) {
        this.reviewId = reviewId;
    }

    public int getAppUserId() {
        return appUserId;
    }

    public void setAppUserId(int appUserId) {
        this.appUserId = appUserId;
    }

    public String getLocationId() {
        return locationId;
    }

    public void setLocationId(String locationId) {
        this.locationId = locationId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public LocalDateTime getPostDate() {
        return postDate;
    }

    public void setPostDate(LocalDateTime postDate) {
        this.postDate = postDate;
    }

    public LocalDateTime getEditDate() {
        return editDate;
    }

    public void setEditDate(LocalDateTime editDate) {
        this.editDate = editDate;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
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
        Review review1 = (Review) o;
        return reviewId == review1.reviewId && appUserId == review1.appUserId && Objects.equals(locationId, review1.locationId) && Objects.equals(title, review1.title) && Objects.equals(review, review1.review) && Objects.equals(author, review1.author) && Objects.equals(parkCode, review1.parkCode) && Objects.equals(postDate, review1.postDate) && Objects.equals(editDate, review1.editDate) && Objects.equals(imgUrl, review1.imgUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(reviewId, appUserId, locationId, title, review, author, parkCode, postDate, editDate, imgUrl);
    }
}
