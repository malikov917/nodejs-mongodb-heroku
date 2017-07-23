var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('about', {
        body: 'The webpage is so awfull because I dont like css'
    });
});

module.exports = router;
