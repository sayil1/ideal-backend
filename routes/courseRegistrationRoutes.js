const router = require("express").Router();
const course = require('../models/courseRegistration');

router.get('/', (req, res) => {
    res.send('flying')
})

router.post('/addcourse', (req, res) => {
    let newCourse = new course({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        session: req.body.session,
        courses:req.body.courses
    })
    console.log(newCourse)

    // course.save().then(
    //     res.send("course successfully added")
    // )
})

router.get('/getcourse', (req, res) => {
    course.find((err, result) => {
        if (err) res.send(err)
        res.send({ result: result })
        // console.log(result)
    })
})

router.get('/delcourse/:id', (req, res) => {
    course.findByIdAndDelete(req.params.id, function(err, output) {
        if (err) {
          res.send({ msg: "error in request" })
        }
        
        res.send({ msg: "deleted successfully" });
      });
})

module.exports = router;