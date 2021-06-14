const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');

const cookieParser = require('cookie-parser');
dotenv.config({ path: './.env' });

const app = express();

// <><><><><><><>  CORS converese localhost  <><><><><><><>
app.use((req, res, next) => { 
	res.setHeader('Access-Control-Allow-Origin', '*'); //any request from any origin be allowed
	res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, Access-Control-Allow-Headers, Content, Accept, Content-Type, Authorization, jwt, id'); // allow all of this header
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // allow all of this following method (function)
	next();
});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// parse JSON bodies (as sent by API clients)
app.use(express.json());
// app.use(cookieParser()); 

db.connect( (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log('mysql connected !')
    }
} )

// Define Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/auth', require('./routes/auth')) //whenever I go on that url, I wanna go that file
app.use('/feed', require('./routes/feed'))

app.listen(4000, () => {
    console.log('App listening on port 4000!');
});
