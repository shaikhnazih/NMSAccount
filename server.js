const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();
dotenv.config({ path: 'config.env' })
const Port = process.env.PORT || 3001
//log requests 
app.use(morgan('tiny'));

//mongodbconnection


//parse request to body
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname,"views/ejs"));

//load assests 

app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
//css/style.css

//load router

app.use('/', require('./server/routes/router'))



app.listen(Port, () => { console.log(`server is running on http://localhost:${Port}`) });
