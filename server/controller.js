const bcrypt = require('bcryptjs');

module.exports = {
    registerUser: async(req, res) => {
        const {username, password, profile_pic} = req.body,
        db = req.app.get('db');

        const foundUser = await db.check_user({username});
        if(foundUser[0]){
            return res.status(400).send('Username taken')
        }

        let salt = bcrypt.genSaltSync(10),
        hash = bcrypt.hashSync(password, salt);

        const newUser = await db.register_user({username, hash, profile_pic});
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },

    login: async(req, res) => {
        const {username, password} = req.body,
        db = req.app.get('db');

        const foundUser = await db.check_user({username});
        if(!foundUser[0]){
            return res.status(400).send('Username does not exist')
        }

        const auth = bcrypt.compareSync(password, foundUser[0].password);
        if(!auth){
            return res.status(401).send('Incorrect password')
        }
        delete foundUser[0].password;
        req.session.user = foundUser[0];
        res.status(202).send(req.session.user);

    },

    getAllPosts: (req, res) => {
        const {userposts, search} = req.query,
        db = req.app.get('db'),
        finalSearch = search+'%';

        if(userposts==='true'&&search){
           return db.get_posts.uptrue_and_search(finalSearch)
            .then(posts => res.status(200).send(posts))
            .catch(err => res.status(500).send(err));
        }

        if(userposts==='false'&&!search){
            return db.get_posts.upfalse_no_search(req.session.user.username)
            .then(posts => {
                res.status(200).send(posts)})
            .catch(err => res.status(500).send(err));
        }

        if(userposts==='false'&&search){
            return db.get_posts.upfalse_and_search([finalSearch, req.session.user.username])
            .then(posts => {
                res.status(200).send(posts)})
            .catch(err => res.status(500).send(err));
        }

        if(userposts==='true'&&!search){
            return db.get_posts.uptrue_no_search()
            .then(posts => res.status(200).send(posts))
            .catch(err => res.status(500).send(err));
        }

    },

    getOnePost: (req, res) => {
        const {id} = req.params,
        db = req.app.get('db');

        db.get_one_post(id)
        .then(post => res.status(200).send(post))
        .catch(err => res.status(500).send(err));
    }
}