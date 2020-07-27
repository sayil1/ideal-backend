const router = require("express").Router();
const email = require('../models/emailModel');
var nodemailer = require('nodemailer');
let HTML = require('./eventsEmail')

router.get('/', (req, res) => {
    res.send('flying')
})

router.post('/subscribe', (req, res) => {
    let Email = new Email({
        email: req.body.email,
        zipCode: req.body.zipCode,
        country:req.body.country
    })

    email.save().then(
        res.send("Successful")
    )
})

router.post('/sendMessage', (req, res) => {
    let Msg = new Email({
        message: req.body.message,
       
    })

  
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
            html: `<h1>hi Sayil </h1> <br><p>  ${req.body.message} </p> <br>`
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


router.get('/getSubscribers', (req, res) => {
    email.find((err, result) => {
        if (err) res.send(err)
        res.send({ result: result })
        // console.log(result)
    })
})

router.get('/delemail/:id', (req, res) => {
    email.findByIdAndDelete(req.params.id, function(err, output) {
        if (err) {
          res.send({ msg: "error in request" })
        }
        
        res.send({ msg: "deleted successfully" });
      });
})

module.exports = router;