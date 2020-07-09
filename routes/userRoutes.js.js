const router = require("express").Router();
const user = require('../models/userModel');

router.get('/', (req, res) => {
    res.send('flying')
})

router.post('/addUser', (req, res) => {
    let Users = new users({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
       
    })
    // console.log(Users)

    Users.save().then(
        res.send("Users successfully added")
    )
})

router.get('/getUsers', (req, res) => {
    users.find((err, result) => {
        if (err) res.send(err)
        res.send({ result: result })
        // console.log(result)
    })
})

router.get('/delUsers/:id', (req, res) => {
    users.findByIdAndDelete(req.params.id, function(err, output) {
        if (err) {
          res.send({ msg: "error in request" })
        }
        
        res.send({ msg: "deleted successfully" });
      });
})

module.exports = router;