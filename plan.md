# Camp Community Website Plan
---
## Schedule by date
**10/16(Mon)** 
  - Detail plan, wireframe, and database. Explore API and image upload.

**10/17(Tue)**
  - Spring Security(back-end)
  - user login/logout/register(front-end)
 
**10/18(Wed)**
  - about_user(backend)
  - user edit/delete(frontend)
  - Browse Campsite
  - Figure out how to manipulate Google Map API
  - connect campground API with map API.
  
**10/19(Thu)** :  
- add favorites(back-end)
- add favorites(front-end)

**10/20(Fri)**
 - camping review(front-end)

**10/21(Sat)**
 - camping review(back-end)

**10/22(Sun)**
 - camping meeting (back-end)

**10/23(Mon)**
- camping meeting (front-end)

**10/24(Tue)**
- Admin pages

**10/25(Wed)**
  - polish the application
  - create presentation ppt and polish README.md.
  - add some stretch goals.

**10/26(Thu)**
  - polish the application
  - create presentation ppt and polish README.md.
  - add some stretch goals.

**10/27(Fri)** : Presentation day!

---
## create database (4 hours)
---
Data tables:
* **app_user**
  - app_user_id int primary key
  - username varchar(50) not null
  - password varchar(50) not null
    
* **app_role**
  - app_role_id int primary key
  - app_role varchar(50) not null
    
* **app_user_role** => bridge table
  - app_user_id int foreign key
  - app_role_id int foreign key
  - 
* **about_user** => for simple data about user(used to show some description about the user)
  - about_user_id int primary key auto_increment
  - app_user_id int foreign key
  - name varchar(255) not null
  - description varchar(255)/ text not null
  - dob date not null
  - gender varchar(10) null
    
* **reviews**
  - review_id int primary key auto_increment
  - app_user_id int not null (fk)
  - location_id int not null
  - title varchar(255) not null
  - review text not null
  - image_id int ??
  - post_date datetime not null default now
  - edit_date datetime default null
  - 
* **favorite** => for favorite campsites.
  - favorite_id int primary key auto_increment
  - location_id int not null (fk)
  - app_user_id int not null (fk)
    
* **camp** => (for camping meeting events)
  - camp_id int primary key auto_increment
  - location_id int not null
  - app_user_id int not null ( host)
  - num_of_people int not null
  - title varchar(255) not null
  - post text not null
  - image_id
  - post_date datetime not null default now
  - edit_date datetime default null
  - status varchar(50) not null default "PENDING" => (OPEN, CLOSED, PENDING, CANCELED)
    
* **camp_app_user**
  - camp_id (primary)
  - app_user_id(primary)
    
* **image** => to upload images.(for both campings and reviews)
  - image_id int primary key
  - image_path
  - image_code(to distinct purpose of image)

* Create test schema with `set_known_good_state` (2 hours)
  
## user register/login
---
### Backend-spring
* Create `app_user` models, repository, and mapper ( 1 hour)
* Create `AppConfig`, `SecurityConfig`, `Jwtconverter`, `JwtRequestFilter` and `AppUserService`(3 hours)
* Create `Authcontroller`(2 hour)
  * `@PostMapping("/authenticate")`
  * `@PostMapping("/refresh-token")`
  * `@PostMapping("/register")`

* Create `about_user` models, repository, and mapper and test(2 hours)
* Create `AboutUserService` and test(2 hours)   
  * `findById`
  * `create`
  * `updateById`
  * `deleteById`   
* Create `AboutUserController`(2 hours)
  * `@RequestMapping("/about-user") 
  * `@GetMapping("/{aboutUserId}"` for `findById`
  * `@PostMapping` for `create`
  * `@PutMapping("/{aboutUserId}")` for `updateById`
  * `@DeleteMapping("/{aboutUserId}")` for `deleteById`

### Frontend-react 
* Create a login form and implement (2 hours)
* Create a signup form and implement(2 hours)
* implement logout (0.5 hour)
* Create a user detail page to edit and delete their information. (2 hours)


## browse campsite
---
### Backend-spring
* Create models, JDBCTemplateRepository and mapper for `favorite` and test(2 hour)
* Create `FavoriteService` and test(2 hour)
  * `findAll`
  * `findById`
  * `Create`
  * `UpdateById`
  * `DeleteById`
* Create `FavoriteController` and add a path to `SecurityConfig`(2 hour)
  * `@RequestMapping("/favorite")`
  * `@GetMapping` for `findAll`
  * `@GetMapping("/{favoriteId}"` for `findById`
  * `@PostMapping` for `create`
  * `@PutMapping("/{favoriteId}")` for `updateById`
  * `@DeleteMapping("/{favoriteId}")` for `deleteById`
 
### Frontend- react
* import google map Api(2-3hours)
* Create an interaction between map API and Campground API(2-3hours)
* Create search function and add favorites(2 hours)
* Create campsite detail page(2hours)

## campsite review
---
### Backend-spring
* Figure out how to use AWS image upload(2-3 hours)
* Create models, JDBCTemplateRepository and mapper for `review` and test(2 hour)
* Create `ReviewService` and test(2 hour)
  * `findAll`
  * `findById`
  * `findByLocationId`
  * `Create`
  * `UpdateById`
  * `DeleteById`
* Create `ReviewController` and add a path to `SecurityConfig`(2 hour)
  * `@RequestMapping("/review")
  * `@GetMapping` for `findAll`
  * `@GetMapping("/{reviewId}"` for `findById`
  * `@GetMapping("/{locationId}"` for `findByLocationId`
  * `@PostMapping` for `create`
  * `@PutMapping("/{reviewId}")` for `updateById`
  * `@DeleteMapping("/{reviewId}")` for `deleteById`
 
### Frontend-react 
  * Create a route and nav list for review.
  * Create a review form and implement `add review` function (3 hours)
  * Create lists of reviews. (2 hour)
  * Implement edit and delete function (3 hour)
  * Create search by location function(STRETCH)

## camping events
---
### Backend-spring
* Create models, JDBCTemplateRepository and mapper for `camp` and test(2 hour)
* Create `CampService` and test(2 hour)
  * `findAll`
  * `findById`
  * `findByLocationId`
  * `Create`
  * `UpdateById`
  * `DeleteById`
* Create `CampController` and add a path to `SecurityConfig`(2 hour)
  * `@RequestMapping("/camp")
  * `@GetMapping` for `findAll`
  * `@GetMapping("/{campwId}"` for `findById`
  * `@GetMapping("/{locationId}"` for `findByLocationId`
  * `@PostMapping` for `create`
  * `@PutMapping("/{campId}")` for `updateById`
  * `@DeleteMapping("/{campId}")` for `deleteById`
 
### Frontend-react 
  * Create a route and nav list for meeting events.
  * Create a meeting form and implement `add camping event` function (3 hours)
  * Create lists of reviews. (2 hour)
  * Implement edit and delete function (2 hours)
  * Create search by location function(STRETCH)

## Handle Error
  * Create error pages ( 2 hours)

---

## STRETCH GOALS
* Add reply function
* Add a search functions to camping events
  * By location
  * By date
  * By user?
* Add a search function to reviews
  * By location
  * By user
  * By date?
* Add pagination?
* upvote for review
* Add another forum where people can exchange or sell their camping equipments.


