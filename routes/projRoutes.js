const router = require("express").Router();
const projects = require('../models/projectsModel')
var nodemailer = require('nodemailer');

router.get('/', (req, res) => {
    console.log("signup works");
    res.send("working")
})

router.post('/newProj', (req, res) => {
    let newProj = new projects({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        interests: req.body.interests
    })
    console.log(req.body)
    newProj
        .save()
        .then(proj => {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sundaysayil4u@gmail.com',
                    pass: 'sayil2194'
                }
            });

            var mailOptions = {
                from: req.body.email,
                to: 'sundaysayil4u@gmail.com',
                subject: 'Sending Email using Node.js',
                html: `<h1>Project Support Interest Indicated </h1> <br><p> from ${req.body.lname} ${req.body.fname}</p> <br>
            <p>in the following projects: ${req.body.interests}</p><br>
            phone:${req.body.phone}`
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
        })
        .catch(err => {
            console.log(err);
        });

    // Instantiate the SMTP server


    res.send(newProj)
})
router.get('/allProj', (req, res) => {
    projects.find((err, result) => {
        if (err) res.send(err)
        res.send({ result: result })
        console.log(result)
    })
})


module.exports = router;