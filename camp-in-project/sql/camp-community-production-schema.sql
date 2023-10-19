drop database if exists camp_community;
create database camp_community;
use camp_community;

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

create table about_user(
	about_user_id int primary key auto_increment,
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
    location_id int not null,
    app_user_id int not null,
    constraint fk_favorite_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id)
);

create table review(
	reveiw_id int primary key auto_increment,
    app_user_id int not null,
    location_id int not null,
    title varchar(255) not null,
    review text not null,
    post_date datetime not null default now(),
    edit_date datetime default null,
	constraint fk_review_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id)
    
);

create table camp(
	camp_id int primary key auto_increment,
    location_id int not null,
    app_user_id int not null,
    num_of_people int not null,
    title varchar(255) not null,
    post text not null,
    post_date datetime not null default now(),
    edit_date datetime default null,
    status varchar(50) not null default "PENDING",
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


insert into app_role (`name`) values
    ('USER'),
    ('ADMIN');

-- passwords are set to "P@ssw0rd!"
insert into app_user (username, password_hash, enabled)
    values
    ('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);
-- insert into app_user (username, password_hash, enabled, first_name, last_name, `description`, dob, gender)
--     values
--     ('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1, 'John', 'Smith', 'I am a man in 20s. I like barbecuing.', '1998-10-12', 'M'  ),
--     ('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1,  'Sally', 'Jones', 'I am a woman in 30s. I love hiking.', '1988-02-27', 'W');

insert into app_user_role
    values
    (1, 2),
    (2, 1);

