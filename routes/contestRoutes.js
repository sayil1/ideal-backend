const router = require("express").Router();
const Contest = require('../models/contestModel')
var nodemailer = require('nodemailer');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const cloudinary = require('cloudinary');
let HTML = require('./mailTemplates/mediaEmail')
cloudinary.config({
  cloud_name: 'ideal-it',
  api_key: '725691721868417',
  api_secret: 'YiiZShk-D18-oY_m7rVv2Fc18Wc'
});


router.get('/', (req, res) => {
  console.log("signup works");
  res.send("working")
})

router.post('/newCont', multipartMiddleware, async (req, res) => {

  console.log(req)

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
      let newCont = new Contest({
        title: req.body.title,
        description: req.body.description,
        imagesPath: imagePath.data,
        location: req.body.location,
        venue: req.body.venue,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        time: req.body.time,
      });
      newCont.save(function (err, data) {
        // console.log(data + " undefined?");
        if (err) {
          console.log(err);

        } else {
          // console.log(data)
          // console.log("Data Saved!");
          // res.send("saved")
        }
      })
    });


})
router.get('/allCont', (req, res) => {
  Contest.find((err, result) => {
    if (err) res.send(err)
    res.send({ result: result })
    // console.log(result)
  }).sort({ created_date : -1})
})

router.get("/del/:id", function (req, res, next) {
  Contest.findByIdAndDelete(req.params.id, function (err, output) {
    if (err) {
      return next(err);
    }
    res.send(output === 1 ? { msg: "success" } : { msg: "error" });
  });
});


router.get('/get-contest/:id', (req, res) => {
  Contest.find({ _id: req.params.id }, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.json({
        result: result
      })
    }
  })
})



router.put('/update-contest/:_id', (req, res) => {
  let newContests = new Contest({
    participant: [{
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      phone: req.body.phone
    }]
  });
  Contest.findByIdAndUpdate(req.params._id,
    { $push: { participant: newContests.participant } },
    function (err, doc) {
      if (err) {
        console.log(err);
      } else {


        Contest.find({ _id: req.params._id }, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            var tt = new HTML.A(req.body.fname, req.body.lname, result.imagesPath, result[0].location, result[0].title, result[0]._id, result[0].startDate, result[0].time, result[0].venue, result[0].description)
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
              subject: 'IDEal IT Contests',
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



      }
    }
  );
}
)

module.exports = router;