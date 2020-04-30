const router = require("express").Router();
const news = require('../models/newsModel');

router.get('/', (req, res) => {
    res.send('flying')
})

router.post('/addNews', (req, res) => {
    let News = new news({
        caption: req.body.caption,
        message: req.body.message,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        endTime: req.body.endTime
    })
    // console.log(News)

    News.save().then(
        res.send("news successfully added")
    )
})

router.get('/getNews', (req, res) => {
    news.find((err, result) => {
        if (err) res.send(err)
        res.send({ result: result })
        // console.log(result)
    })
})

router.get('/delNews/:id', (req, res) => {
    news.findByIdAndDelete(req.params.id, function(err, output) {
        if (err) {
          res.send({ msg: "error in request" })
        }
        
        res.send({ msg: "deleted successfully" });
      });
})

module.exports = router;