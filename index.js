const express = require('express')
const app = express()
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
const port = 5000;
//  mongoose.connect('mongodb://localhost/ideal', {useNewUrlParser: true});

 mongoose.connect('mongodb+srv://admin:sayil2194@cluster0-ueg0l.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});


 

// mongoose.connect("mongodb://localhost:27017/ideal");ideal
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
app.post('/login', function (req, res) {
	console.log(req.body)

	if (req.body.email == "idealcenter.ng@gmail.com" || req.body.password == "ideal@7480!") {
		res.send({
			status: "ok",
			message: "welcome Admin"
		})
		console.log("welcome")
	}
	else {
		res.send({
			status: "error",
			message: "wrong login details"
		})
		console.log("error")
	}

})

app.use('/proj', require('./routes/projRoutes'))
app.use("/cont", require('./routes/contRoutes'))
app.use("/eve", require('./routes/eventsRoutes'))
app.use("/news", require('./routes/newsRoutes'))
app.use("/books", require('./routes/bookRoutes'))
app.use("/diy", require('./routes/diyRoutes'))
app.use("/web", require('./routes/webinarRoutes'))
app.use("/contest", require('./routes/contestRoutes'))
app.use("/user", require('./routes/userRoutes.js'))
app.use("/toefl", require('./routes/toeflRoutes'))
app.use("/pearson", require('./routes/pearsonROutes'))
app.use("/emailUpdates", require('./routes/emailRoutes'))
app.use("/registerCourse", require('./routes/courseRegistrationRoutes'))

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))