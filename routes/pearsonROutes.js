const router = require("express").Router();
const pearson = require('../models/pearsonModel')
var nodemailer = require('nodemailer');
let HTML = require("./mailTemplates/examMail")
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

router.post('/newpearson', multipartMiddleware, async (req, res) => {
  console.log(req.body)

  let x = await cloudinary.v2.uploader.upload(
    req.files.image.path, {
    width: 700,

    gravity: "south",
    y: 80,
    color: "white"
  },
    function (error, result) {
      if (error) {
        res.send("Network Error")
      }
      console.log({
        data: result
      });
      imagePath = {
        data: result.secure_url
      };

      //   var now = new Date();
      //   var expiresIn = new Date(now);
      //   expiresIn.setDate(expiresIn.getDate() + 7);

      console.log(imagePath);
      let newpearson = new pearson({
        imagesPath: imagePath.data,
        sname: req.body.sname,
        fname: req.body.fname,
        mname: req.body.fname,
        email: req.body.email,
        date: req.body.date,
        contAdress: req.body.contAdress,
        country: req.body.country,
        examDate: req.body.examDate,
        examCenter: req.body.examCenter,
      });

      newpearson.save(function (err, data) {
        // console.log(data + " undefined?");
        if (err) {
          console.log(err);
          res
        } else {
          console.log(data)
          console.log("Data Saved!");
          res.send("saved")


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
          let ExamType = "PEARSON"
          var tt = new HTML.ExamMail(req.body.sname, req.body.fname, req.body.mname, imagePath.data, req.body.email, req.body.contAdress, req.body.country, req.body.examCenter, req.body.examDate, ExamType)
          var mailOptions = {
            from: req.body.Email,
            to: 'idealcenter.ng@gmail.com',
            subject: 'IDeal-IT | Pearson Registrations',
            html: tt.getMail()
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
      })
      console.log(newpearson)
    });


})
router.get('/allpearson', (req, res) => {
  pearson.find((err, result) => {
    if (err) res.send(err)
    res.send({ result: result })
    // console.log(result)
  })
})

router.get("/del/:id", function (req, res, next) {
  pearson.findByIdAndDelete(req.params.id, function (err, output) {
    if (err) {
      return next(err);
    }
    res.send(output === 1 ? { msg: "success" } : { msg: "error" });
  });
});


router.get('/get-event/:id', (req, res) => {
  pearson.find({ _id: req.params.id }, (err, result) => {
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
  pearson.findByIdAndUpdate(req.params._id, newInfo, { upsert: true, new: true }, (err, result) => {
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