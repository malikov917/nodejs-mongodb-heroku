var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {compliments: ['Awesome', 'Cool', 'The best programmer over the world']});
});

router.get('/test/:id', function (req, res, next) {
    console.log("Request handler random was called.");
    var vd = require('../videodata.json');
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(vd));
    res.end();
});

router.post('/test/submit', function (req, res, next) {
    var body = req.body.id;
    res.redirect('/test/' + body);
});
module.exports = router;
