const router = require("express").Router();
var nodemailer = require('nodemailer');
let HTML = require("./mailTemplates/adminMail")
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
        interests: req.body.Interests
    })
    console.log(req.body.Interests)
    // res.send("success")
    newProj
        .save()
        .then(proj => {

            var statusMessage = `A message from the Surport projects page with the following interest(s) indicated:<br> ${req.body.Interests}`
            var mail = new HTML.AdminMail(req.body.fname, req.body.lname, req.body.email, req.body.message, req.body.phone, statusMessage,)

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
                subject: 'IDeal IT Projects',
                html: mail.getMail()
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


    // res.send(newProj)
})
router.get('/allProj', (req, res) => {
    projects.find((err, result) => {
        if (err) res.send(err)
        res.send({ result: result })
        console.log(result)
    })
})


module.exports = router;