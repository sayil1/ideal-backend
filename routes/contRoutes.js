const router = require("express").Router();
const contacts = require('../models/contactModel')
var nodemailer = require('nodemailer');
let HTML = require("./mailTemplates/adminMail")

router.get('/', (req, res) => {
    console.log("signup works");
    res.send("working")
})

router.post('/newCont', (req, res) => {
    let newcont = new contacts({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    })

    // res.send("successfully registered")
    // console.log("seene")
    // newcont
    //     .save()
    //     .then(cont => {
    //          res.send("successfully sent")
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.send("error, please try again!")
    //     });
    
    var statusMessage = "A message from the contacts page. see details below"
    var mail = new HTML.AdminMail(req.body.fname, req.body.lname, req.body.email, req.body.message, req.body.phone, statusMessage)
    
    var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'sundaysayil4u@gmail.com',
                pass: 'seyilnen2194'
              }
            });

            var mailOptions = {
              from: req.body.email,
              to: 'sundaysayil4u@gmail.com',
              subject: 'IDEal IT Contacts',
              html: mail.getMail()
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
                res.send(error)
              } else {
                console.log('Email sent: ' + info.response);
                res.send('Recieved successfully, we will reach out soonest ');
              }
            });;
})
// router.get('/allCont', (req, res) => {
//     contects.find((err, result) => {
//         if (err) res.send(err)
//         res.send({ result: result })
//         console.log(result)
//     })
// })


module.exports = router;