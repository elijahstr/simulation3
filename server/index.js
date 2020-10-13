require('dotenv').config();
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const ctrl = require('./controller');
const app = express();
app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000*60*60*24*365}
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then((db)=>{
    app.set('db', db);
    console.log('database connected');
})
.catch(err => console.log(err));

app.post('/auth/register', ctrl.registerUser);
app.post('/auth/login', ctrl.login);
app.get('/api/posts/:id', ctrl.getAllPosts);
app.get('/api/one_post/:id', ctrl.getOnePost);
app.put('/api/edit_post/:id', ctrl.editPost);



app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`));