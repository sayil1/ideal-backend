const router = require("express").Router();
const Event = require('./../models/webinarModel')
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

router.post('/newWeb', multipartMiddleware, async (req, res) => {

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
            imagePath = {
                data: result.secure_url
            };
            console.log(imagePath);
            let newWeb = new Event({
                title: req.body.title,
                description: req.body.description,
                imagesPath: imagePath.data,
                location: req.body.location,
                venue: req.body.venue,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                time: req.body.time,
            });
            newWeb.save(function (err, data) {
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
router.get('/allWeb', (req, res) => {
    Event.find((err, result) => {
        if (err) res.send(err)
        res.send({ result: result })
        // console.log(result)
    })
})

router.get("/del/:id", function(req, res, next) {
    Event.findByIdAndDelete(req.params.id, function(err, output) {
      if (err) {
        return next(err);
      }
      res.send(output === 1 ? { msg: "success" } : { msg: "error" });
    });
  });


router.get('/get-webinar/:id', (req, res) => {
    Event.find({ _id: req.params.id }, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.json({
          result:result
        })
      }
    })
  })

router.put('/update-webinar/:_id', (req, res) => {
    // var newInfo = req.body
    let newParticipants = new Contest({
      participant: [{
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone
      }]
    });
    Contest.findByIdAndUpdate(req.params._id,
      { $push: { participant: newParticipants.participant } },
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
                auth: {
                  user: 'sundaysayil4u@gmail.com',
                  pass: 'seyilnen2194'
                }
              });
  
              var mailOptions = {
                from: 'sundaysayil4u@gmail.com',
                to: req.body.email,
                subject: 'IDEal IT Webinars',
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