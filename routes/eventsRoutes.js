const router = require("express").Router();
const Event = require('../models/eventsModel')
var nodemailer = require('nodemailer');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const cloudinary = require('cloudinary');
var nodemailer = require('nodemailer');
let HTML = require('./mailTemplates/mediaEmail')
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
  }).sort({ created_date : -1})
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
  // let newInfo = req.body
  let newEvents = new Event({
    participant: [{
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      phone: req.body.phone
    }]
  });
  // console.log(newInfo)
  Event.findByIdAndUpdate(req.params._id,
    { $push: { participant: newEvents.participant } },
    function (err, doc) {
      if (err) {
        console.log(err);
      } else {


        Event.find({ _id: req.params._id }, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            // res.json({
            //   result: result
            // })
            var tt = new HTML.A(req.body.fname, req.body.lname, result[0].imagesPath, result[0].location, result[0].title, result[0]._id, result[0].startDate, result[0].time, result[0].venue, result[0].description)
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
              to: req.body.email,
              subject: 'IDEal IT Events',
              html: tt.getMail()
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
                res.send(error)
              } else {
                console.log('Email sent: ' + info.response);
                res.send('Check your email, Your Ticket ID has been sent. Thank You!! ');
              }
            });;
          }
        })



        // var tt = new HTML.A(req.body.fname, req.body.lname, )
        // var transporter = nodemailer.createTransport({
        //               service: 'gmail',
        //               auth: {
        //                   user: 'sundaysayil4u@gmail.com',
        //                   pass: 'seyilnen2194'
        //               }
        //           });

        //           var mailOptions = {
        //               from: 'sundaysayil4u@gmail.com',
        //               to: req.body.email,
        //               subject: 'Sending Email using Node.js',
        //               html: tt.getMail()
        //           };

        //           transporter.sendMail(mailOptions, function (error, info) {
        //               if (error) {
        //                   console.log(error);
        //                   res.send(error)
        //               } else {
        //                   console.log('Email sent: ' + info.response);
        //                   res.send('Check your email, Your Ticket ID has been sent. Thank You!! ');
        //               }
        //           });;
        console.log(newEvents)
        // res.status(200).send({
        //   message: "added successful"
        // })
      }
    }
  );
})

module.exports = router;