create database DB_TEST;

create table user
(
    createdAt datetime(6) default CURRENT_TIMESTAMP(6) not null,
    updatedAt datetime(6) default CURRENT_TIMESTAMP(6) not null,
    id        bigint auto_increment
        primary key,
    email     varchar(255)                             not null,
    name      varchar(255)                             not null,
    password  varchar(255)                             not null,
    isActive  tinyint                                  not null,
    lastLogin timestamp   default CURRENT_TIMESTAMP    not null,
    constraint IDX_e12875dfb3b1d92d7d7c5377e2
        unique (email)
);
