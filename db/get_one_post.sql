select p.id, p.title, p.img, u.username, u.profile_pic from posts p
join users_helo u on p.author_id = u.id
where p.id=$1;