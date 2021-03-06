const router = require("express").Router();
const Email = require('../models/emailUpdatesModel');
var nodemailer = require('nodemailer');
let HTML = require('./mailTemplates/mediaEmail')

router.get('/', (req, res) => {
    res.send('flying')
})

router.post('/subscribe', (req, res) => {
    let newmail = new Email({
        Email: req.body.Email,
        zipCode: req.body.zipCode,
        country: req.body.country
    })
    Email.find({ email: req.body.email }, (err, result) => {
        if (!result && !err) {
            newmail.save().then(
                res.send("Saved Successfully ")
            )
        } else if (result) {
            res.send("hi, we already have your mail, stay tuned for our next update")
        } else if (err) {
            res.send("error while saving, please try again", err)

        }

        // console.log(result)
    })
})

router.post('/sendMessage', (req, res) => {
    let emailList
    let Msg = new Email({
        message: req.body.message,

    })
    Email.find((err, result) => {
        if (err) {
            res.send(err)
        } else {
            // res.send({ result})
            for (n in result) {
                // this.emailList+=`,"${result[n].Email}"`

                console.log(result)
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
                    from: 'idealcenter.ng@gmail.com',
                    to: result[n].Email,
                    subject: 'UPDATES - IDEAL IT CENTER',
                    html: `${req.body.message}`
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
            }


            console.log("success")
        }



    })


})


router.get('/getSubscribers', (req, res) => {
    Email.find((err, result) => {
        if (err) res.send(err)
        res.send({ result: result })
        // console.log(result)
    })
})

router.get('/delemail/:id', (req, res) => {
    Email.findByIdAndDelete(req.params.id, function (err, output) {
        if (err) {
            res.send({ msg: "error in request" })
        }

        res.send({ msg: "deleted successfully" });
    });
})

module.exports = router;