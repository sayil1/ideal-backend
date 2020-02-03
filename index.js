const express = require('express')
const app = express()
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost/ideal', {useNewUrlParser: true});
// mongoose.connect('mongodb+srv://sayil:sayil2194@cluster0-knm9b.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.connect("mongodb://localhost:27017/ideal");
var cors = require('cors')
app.use(cors())
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function (req, res) {
  res.send('Hello World')
})
app.use('/proj', require('./routes/projRoutes'))
app.use("/cont", require('./routes/contRoutes'))
app.use("/eve", require('./routes/eventsRoutes'))
 
app.listen(5000)