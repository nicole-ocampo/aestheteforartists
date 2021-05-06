const dotenv = require(`dotenv`);
const fs = require(`fs`);
const express = require(`express`);
const session = require(`express-session`);
const bodyParser = require(`body-parser`);
const db = require(`./models/db.js`);
const routes = require('./routes/routes.js');
const alert = require(`alert`);

const app = express();

dotenv.config();
port = process.env.PORT || process.env.YOUR_PORT;
hostname = process.env.HOSTNAME;
app.set(`view engine`, `hbs`);




app.use(bodyParser.urlencoded({ extended: false}));



var path = require('path')
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use(function(req, res) {
    res.render('index');
});


// db.connect();
app.listen(port, hostname, function(){
	console.log(`Server running at: `);
	console.log(`http://` + hostname + `:` + port);
});