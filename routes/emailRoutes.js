const router = require("express").Router();
const email = require('../models/emailUpdatesModel');
var nodemailer = require('nodemailer');
let HTML = require('./mediaEmail')

router.get('/', (req, res) => {
    res.send('flying')
})

router.post('/subscribe', (req, res) => {
    let newmail = new email({
        email: req.body.email,
        zipCode: req.body.zipCode,
        country:req.body.country
    })

    newmail.save().then(
        res.send("Saved Successfully ")
    )
})

router.post('/sendMessage', (req, res) => {
    let emailList
    let Msg = new email({
        message: req.body.message,
       
    })
    email.find((err, result) => {
        if (err) {
            res.send(err)
        } else{
            // res.send({ result})
            for (n in result){
                // this.emailList+=`,"${result[n].email}"`

                console.log(result)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sundaysayil4u@gmail.com',
                pass: 'seyilnen2194'
            }
        });

        var mailOptions = {
            from: req.body.email,
            to: result[n].email,
            subject: '',
            html: `  ${req.body.message} `
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