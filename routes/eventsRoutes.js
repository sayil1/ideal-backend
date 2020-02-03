const router = require("express").Router();
const contacts = require('../models/eventsModel')
var nodemailer = require('nodemailer');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'sayil',
    api_key: '443611676341187',
    api_secret: 'wAPlHaXu39fxiKuBr9ZN4Gp6IxA'
});


router.get('/', (req, res) => {
    console.log("signup works");
    res.send("working")
})

router.post('/newEve', multipartMiddleware, async (req, res) => {
    let x = await cloudinary.v2.uploader.upload(
        req.files.image.path, {
        width: 700,
   
        gravity: "south",
        y: 80,
        color: "white"
    },
        function (error, result) {
            if (error) {
                console.log("error here")
            }
            res.json({
                data: result
            });
            imagePath = {
                data: result.secure_url
            };
            console.log(imagePath);
            let newEvents = new contacts({
                title: req.body.title,
                description: req.body.description,
                imagesPath: imagePath.data,
                location: req.body.location,
                venue: req.body.venue,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                time: req.body.time,
            });
            newEvents.save(function (err, data) {
                // console.log(data + " undefined?");
                if (err) {
                    console.log(err);
                } else {
                    console.log(data)
                    console.log("Data Saved!");
                }
            })
        });
})
router.get('/allEve', (req, res) => {
    contects.find((err, result) => {
        if (err) res.send(err)
        res.send({ result: result })
        console.log(result)
    })
})


module.exports = router;