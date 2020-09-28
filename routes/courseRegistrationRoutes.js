const router = require("express").Router();
const course = require('../models/courseRegistration');
var nodemailer = require('nodemailer');
router.get('/', (req, res) => {
    res.send('flying')
})

router.post('/addcourse', (req, res) => {
    let newCourse = new course({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        session: req.body.session,
        courses: req.body.course
    })
    console.log(newCourse)

    newCourse.save().then(
        proj => {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                ignoreTLS: false,
                secure: false,
                auth: {
                    user: 'idealcenter.ng@gmail.com',
                    pass: 'Ideal@7480!'
                }
            });

            var mailOptions = {
                from: req.body.email,
                to: 'idealcenter.ng@gmail.com',
                subject: 'IDEal IT Course Registration',
                html: `<h3>Details </h3> <br> Course registration was successful with the following details <br>
                  <p>Last Name: ${req.body.lname} <br> First Name: ${req.body.fname} <br> Email: ${req.body.email}
                <br>Phone Number: ${req.body.phone} <br> Sessions: ${req.body.session} <br> Courses: ${req.body.course}</p> <br>
           `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.send(error)
                } else {
                    console.log('Email sent: ' + info.response);
                    res.send('Email sent, Thank You!! ');
                }
            });;
            console.log("success")
        }

    )
})

router.get('/getcourse', (req, res) => {
    course.find((err, result) => {
        if (err) res.send(err)
        res.send({ result: result })
        // console.log(result)
    })
})

router.get('/delcourse/:id', (req, res) => {
    course.findByIdAndDelete(req.params.id, function (err, output) {
        if (err) {
            res.send({ msg: "error in request" })
        }

        res.send({ msg: "deleted successfully" });
    });
})

module.exports = router;