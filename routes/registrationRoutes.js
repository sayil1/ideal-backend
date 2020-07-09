const router = require("express").Router();
const registration = require('../models/newsModel');

router.get('/', (req, res) => {
    res.send('flying')
})

router.post('/addReg', (req, res) => {
    let Reg = new registration({
        surname: req.body.surname,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        email: req.body.email,
        phone: req.body.phone,
        contactAddress: req.body.contactAddress,
        countryOfBirth: req.body.countryOfBirth,
        examDate: req.body.examDate,
        examCenter: req.body.examCenter,
        passPort: req.body.passPort,
        institutionToSendScores: req.body.institutionToSendScores,
        premiumAccount: {
            userName: req.body.premiumAccount.userName,
            password: req.body.premiumAccount.password
        }
    })
    // console.log(News)

    Reg.save().then(proj => {
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
})

router.get('/getReg', (req, res) => {
    registration.find((err, result) => {
        if (err) res.send(err)
        res.send({ result: result })
        // console.log(result)
    })
})

router.get('/delReg/:id', (req, res) => {
    registration.findByIdAndDelete(req.params.id, function (err, output) {
        if (err) {
            res.send({ msg: "error in request" })
        }

        res.send({ msg: "deleted successfully" });
    });
})

module.exports = router;