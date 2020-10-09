create table users_helo (
    id serial primary key,
    username varchar(20),
    password varchar(20),
    profile_pic TEXT
);

create table posts (
    id serial primary key,
    title varchar(45),
    img text,
    content text,
    author_id int references users_helo(id)
);

INSERT into users_helo (username, password, profile_pic)
values ('user1', 'password1', 'https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg'), 
('user2', 'password2', 'https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg'), 
('user3', 'password3', 'https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg');

insert into posts (title, img, content, author_id)
values ('Post 1', 'https://www.deccanherald.com/sites/dh/files/article_images/2020/05/19/604513-2135246437-1491282148.jpg', 'Nice egg', 1),
('Post 2', 'https://www.deccanherald.com/sites/dh/files/article_images/2020/05/19/604513-2135246437-1491282148.jpg', 'Nice egg2', 1),
('Post 3', 'https://www.deccanherald.com/sites/dh/files/article_images/2020/05/19/604513-2135246437-1491282148.jpg', 'Nice egg3', 2);