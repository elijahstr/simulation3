require('dotenv').config();
const {SERVER_PORT, CONNECTION_STRING} = process.env;
const express = require('express');
const massive = require('massive');
const ctrl = require('./controller');
const app = express();
app.use(express.json());

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



app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`));