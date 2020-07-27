const router = require("express").Router();
const contacts = require('../models/contactModel')
var nodemailer = require('nodemailer');

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
        message: req.body.interests
    })

    // res.send("successfully registered")
    console.log("seene")
    newcont
        .save()
        .then(cont => {
             res.send("successfully sent")
        })
        .catch(err => {
            console.log(err);
            res.send("error, please try again!")
        });
})
router.get('/allCont', (req, res) => {
    contects.find((err, result) => {
        if (err) res.send(err)
        res.send({ result: result })
        console.log(result)
    })
})


module.exports = router;