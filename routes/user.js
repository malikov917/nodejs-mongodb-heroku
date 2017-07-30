let express = require('express');
let router = express.Router();
let ObjectID = require('mongodb').ObjectID;

router.get(`/getall`, (req, res) => {
    db.collection('user').find().toArray((err, results) => {
        if (err) return res.send(err);
        res.send(results);
    })
});

router.get(`/deleteall`, (req, res) => {
    db.collection('user').removeMany({}, (err, response) => {
        if (err) return res.send(err);
        res.send(response);
    })
});

router.post('/', function (req, res) {
    let user = {
        name: req.body.name,
        collections: req.body.collections};
    db.collection('user').insertOne(user, (err) => {
        if (err) return res.send(err.toJSON);
        res.send(user);
    });
});

router.put(`/:id`, (req, res) => {
    let id = req.params.id;
    let user = {
        name: req.body.name,
        collections: req.body.collections};
    let objId = {'_id': new ObjectID(id)};
    db.collection('notes').updateOne(objId, user, (err, item) => {
        if (err) {
            res.send({'error': err});
        } else {
            res.send(user);
        }
    })
});

router.get('/', (req, res) => {

});

router.get(`/:id`, (req, res) => {

});

router.delete(`/:id`, (req, res) => {

});

module.exports = router;