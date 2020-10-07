const router = require("express").Router();
const Books = require('../models/booksModel')
var nodemailer = require('nodemailer');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'ideal-it',
  api_key: '725691721868417',
  api_secret: 'YiiZShk-D18-oY_m7rVv2Fc18Wc'
});


router.get('/', (req, res) => {
  console.log("signup works");
  res.send("working")
})

router.post('/newBook', multipartMiddleware, async (req, res) => {
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

      var now = new Date();
      var expiresIn = new Date(now);
      expiresIn.setDate(expiresIn.getDate() + 7);

      console.log(imagePath);
      let newBooks = new Books({
        imagesPath: imagePath.data,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        imagesPath: imagePath.data,
        price: req.body.price,
        topTrend: expiresIn,
        quantity: req.body.quantity,
      });

      newBooks.save(function (err, data) {
        // console.log(data + " undefined?");
        if (err) {
          console.log(err);
          res.send("eroor here")
        } else {
          console.log(data)
          console.log("Data Saved!");
          res.send("saved")
        }
      })
      console.log(req)
    });


})
router.get('/allBooks/:fil', (req, res) => {

  if (!req.params.fil) {
    let filter = "."
    Books.find({
      $or: [{ title: new RegExp(filter + "?", 'i', "g") }, { category: new RegExp(filter + "?", 'i', "g") },]
    }, (err, result) => {
      if (err) res.send(err)
      res.send({ result: result })
      // console.log(result)
    })
  }
  else {
    let filter = req.params.fil
    Books.find({
      $or: [{ title: new RegExp(filter + "?", 'i', "g") }, { category: new RegExp(filter + "?", 'i', "g") },]
    }, (err, result) => {
      if (err) res.send(err)
      res.send({ result: result })
      // console.log(result)
    })
  }


})

router.get('/allBooks/', (req, res) => {
  Books.find({}, (err, result) => {
    if (err) res.send(err)
    res.send({ result: result })
    // console.log(result)
  }).sort({ created_date : -1})
})

router.get('/allBookscat/:cat', (req, res) => {
  let filter = req.params.cat
  Books.find({ category: new RegExp(filter + "?", 'i', "g") }, (err, result) => {
    if (err) res.send(err)
    res.send({ result: result })
    // console.log(result)
  }).sort({ created_date : -1})
})



router.get("/del/:id", function (req, res, next) {
  Books.findByIdAndDelete(req.params.id, function (err, output) {
    if (err) {
      return next(err);
    }
    res.send(output === 1 ? { msg: "success" } : { msg: "error" });
  });
});


router.get('/get-event/:id', (req, res) => {
  Books.find({ _id: req.params.id }, (err, result) => {
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
  Books.findByIdAndUpdate(req.params._id, newInfo, { upsert: true, new: true }, (err, result) => {
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