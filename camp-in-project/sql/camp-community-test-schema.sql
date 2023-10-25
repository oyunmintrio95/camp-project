drop database if exists camp_community_test;
create database camp_community_test;
use camp_community_test;

create table app_user (
    app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    enabled bit not null default(1)
);

create table app_role (
    app_role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table app_user_role (
    app_user_id int not null,
    app_role_id int not null,
    constraint pk_app_user_role
        primary key (app_user_id, app_role_id),
    constraint fk_app_user_role_user_id
        foreign key (app_user_id)
        references app_user(app_user_id),
    constraint fk_app_user_role_role_id
        foreign key (app_role_id)
        references app_role(app_role_id)
);

create table user_profile(
	user_profile_id int primary key auto_increment,
    app_user_id int not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    `description` varchar(255) not null,
    dob date null,
    gender varchar(10) null,
    constraint fk_about_user_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id)
);

create table favorite(
	favorite_id int primary key auto_increment,
    location_id varchar(100) not null,
    app_user_id int not null,
    constraint fk_favorite_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id)
);

create table review(
	review_id int primary key auto_increment,
    app_user_id int not null,
    location_id varchar(100) not null,
    title varchar(255) not null,
    review text not null,
    post_date datetime not null default now(),
    edit_date datetime default null,
    img_url varchar(255),
	park_code varchar(10) not null,
    author varchar(100) not null,
	constraint fk_review_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id)
    
);

create table camp(
	camp_id int primary key auto_increment,
    location_id varchar(100) not null,
    app_user_id int not null,
    num_of_people int not null,
    start_date date not null,
    end_date date not null,
    title varchar(255) not null,
    post text not null,
    post_date datetime not null default now(),
    edit_date datetime default null,
    `status` varchar(50) not null default "PENDING",
    constraint fk_camp_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id)
);

create table camp_app_user(
	camp_id int not null,
    app_user_id int not null,
    constraint pk_camp_app_user
		primary key (camp_id, app_user_id),
	constraint fk_camp_app_user_camp_id
		foreign key (camp_id)
        references camp(camp_id),
	constraint fk_camp_app_user_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id)
);

delimiter //
create procedure set_known_good_state()
begin
	delete from user_profile;
    alter table user_profile auto_increment = 1;
	delete from favorite;
    alter table favorite auto_increment = 1;
    delete from review;
    alter table review auto_increment = 1;
    delete from camp_app_user;
    delete from camp;
    alter table camp auto_increment = 1;
	delete from app_user_role;
    delete from app_role;
    alter table app_role auto_increment = 1;
    delete from app_user;
    alter table app_user auto_increment = 1;

insert into app_role (`name`) values
    ('USER'),
    ('ADMIN');

-- passwords are set to "P@ssw0rd!"
insert into app_user (username, password_hash, enabled)
    values
    ('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);

insert into app_user_role
    values
    (1, 2),
    (2, 1);
    
insert into camp (location_id, app_user_id, num_of_people, start_date, end_date, title, post)
	values
    ("EA81BC45-C361-437F-89B8-5C89FB0D0F86", 1, 5,'2023-12-20','2023-12-22', "camp title 1", "camp post 1"),
    ("1241C56B-7003-4FDF-A449-29DA8BCB0A41", 2, 4,'2023-11-10','2023-11-12', "camp title 2", "camp post 2");
    
insert into camp_app_user
	values
    (1,2),
    (2,1);
    
insert into review (app_user_id, location_id, title, review, img_url, park_code, author)
	values
    (1, "EA81BC45-C361-437F-89B8-5C89FB0D0F86", "review title 1", "review content 1", "https://campen-joy-bucket.s3.amazonaws.com/landscape-g78e0b0e38_1280.jpg", "amis","john@smith.com"),
    (2, "1241C56B-7003-4FDF-A449-29DA8BCB0A41", "review title 2", "review content 2", "https://campen-joy-bucket.s3.amazonaws.com/landscape-g78e0b0e38_1280.jpg","grsm","sally@jones.com");
    
insert into favorite (app_user_id, location_id)
	values
    (1, "EA81BC45-C361-437F-89B8-5C89FB0D0F86"),
    (1, "1241C56B-7003-4FDF-A449-29DA8BCB0A41"),
    (2, "EA81BC45-C361-437F-89B8-5C89FB0D0F86"),
    (2, "1241C56B-7003-4FDF-A449-29DA8BCB0A41");
    
insert into user_profile ( app_user_id, first_name, last_name, `description`, dob, gender)
	values
    (1, 'John', 'Smith', "I'm in 30's and I love fishing and barbecuing.", null , 'Male'),
    (2, 'Sally', 'Jones', "I'm in 20's and I love hiking and some outdoor activities!", '1997-03-05', null);
    
end//
delimiter ;

