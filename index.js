const express = require('express')
const app = express()
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
const port = 5000;
// mongoose.connect('mongodb://localhost/ideal', {useNewUrlParser: true});
//  mongoose.connect('mongodb+srv://admin:sayil2194@cluster0-ueg0l.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.connect("mongodb://localhost:27017/ideal");
var cors = require('cors')
app.use(cors())
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function (req, res) {
  res.send('Hello World')
  console.log("Hello")
})
app.post('/login', function (req, res){
	console.log(req.body)

	if(req.body.email=="ideal@gmail.com" || req.body.password == "admin"){
		res.send({
			status:"ok",
			message:"welcome Admin"
		})
		console.log("welcome")
	}
	else{
		res.send({
			status:"error",
			message:"wrong login details, contact web developer"
		})
		console.log("error")
	}

})
app.use('/proj', require('./routes/projRoutes'))
app.use("/cont", require('./routes/contRoutes'))
app.use("/eve", require('./routes/eventsRoutes'))
app.use("/news", require('./routes/newsRoutes'))
app.use("/books", require('./routes/bookRoutes'))

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))