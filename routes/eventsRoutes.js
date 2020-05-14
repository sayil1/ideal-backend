const router = require("express").Router();
const Event = require('../models/eventsModel')
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

  //   var now = new Date();
  //   var expiresIn = new Date(now);
  //   expiresIn.setDate(expiresIn.getDate() + 7);
  //   let newEvents = new Event({
  //   title: req.body.title,
  //   expiresIn: expiresIn,
  //   description: req.body.description,
  //   location: req.body.location,
  //   venue: req.body.venue,
  //   startDate: req.body.startDate,
  //   endDate: req.body.endDate,
  //   time: req.body.time,
  //   });
  //   res.send(newEvents)

  console.log(req.files.image.path)
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

      imagePath = {
        data: result.secure_url
      };
      console.log(imagePath);


      let newEvents = new Event({
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
          // res.send("error")
        } else {
          console.log("Data Saved!");
          res.send("saved")
        }
      })
    });


})
router.get('/allEve', (req, res) => {
  Event.find((err, result) => {
    if (err) res.send(err)
    res.send({ result: result })
    // console.log(result)
  })
})

router.get("/del/:id", function (req, res, next) {
  Event.findByIdAndDelete(req.params.id, function (err, output) {
    if (err) {
      return next(err);
    }
    res.send(output === 1 ? { msg: "success" } : { msg: "error" });
  });
});


router.get('/get-event/:id', (req, res) => {
  Event.find({ _id: req.params.id }, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.json({
        result: result
      })
    }
  })
})

router.put('/update-event/:_id', (req, res) => {
  // var newInfo = req.body
  let newInfo = req.body
  console.log(req.params._id, "newID")
  Event.findByIdAndUpdate(req.params._id, newInfo, { upsert: true, new: true }, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.json({
        message: "updated",
        //  authData
        result
      })
    }
  })
})

module.exports = router;