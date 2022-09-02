// npm install mongodb
// npm install express
// npm install --save-dev nodemon
// npm install ejs
// npm install bcryptjs
// npm start

const path = require('path');

const express = require('express');

const db = require('./data/database');
const authRoutes = require('./routes/auth_routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public')); // serving views
app.use(express.urlencoded({ extended: false })); //form submission handling middleware

app.use(authRoutes);

db.connectToDatabase().then(function() {
    app.listen(3000);
}).catch(function(error) {
    console.log('Failed to connect to the database!');
    console.log(error);
});
