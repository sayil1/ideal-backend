const router = require("express").Router();
const Diys = require('../models/diyModel')
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

router.post('/newDiy', multipartMiddleware, async (req, res) => {
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
        console.log("error here")
      }
      console.log({
        data: result
      });
      imagePath = {
        data: result.secure_url
      };
      console.log(imagePath);
      let newDiys = new Diys({
        imagesPath: imagePath.data,
        title: req.body.title,
        description: req.body.description,
        imagesPath: imagePath.data,
        price: req.body.price,
        quantity: req.body.quantity,
      });
      newDiys.save(function (err, data) {
        // console.log(data + " undefined?");
        if (err) {
          console.log(err);
          res
        } else {
          console.log(data)
          console.log("Data Saved!");
          res.send("saved")
        }
      })
      console.log(newDiys)
    });
})

router.get('/allDiys', (req, res) => {
  Diys.find((err, result) => {
    if (err) res.send(err)
    res.send({ result: result })
    // console.log(result)
  }).sort({ created_date : -1})
})

router.get("/del/:id", function (req, res, next) {
  Diys.findByIdAndDelete(req.params.id, function (err, output) {
    if (err) {

      return next(err);

    }
    res.send(output === 1 ? { msg: "success" } : { msg: "error" });
  });
});


router.get('/get-diy/:id', (req, res) => {
  Diys.find({ _id: req.params.id }, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.json({
        result: result
      })
    }
  })
})

router.put('/update-diy/:_id', (req, res) => {
  // var newInfo = req.body
  let newInfo = req.body
  console.log(req.params._id, "newID")
  Diys.findByIdAndUpdate(req.params._id, newInfo, { upsert: true, new: true }, (err, result) => {
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