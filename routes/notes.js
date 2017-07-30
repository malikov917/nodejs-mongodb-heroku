let express = require('express');
let router = express.Router();
let ObjectID = require('mongodb').ObjectID;
let Note = require('../impl/notes.impl');

/* POST new NOTE. */
router.post('/', function (req, res) {
    new Note(req, res).postOne();
});

/* GET all NOTES */
router.get('/', (req, res) => {
    let auth = req.headers.authorization;

    db.collection('notes').find({auth: auth}).toArray((err, results) => {
        res.send(results);
    })
});

/* GET NOTE by _id */
router.get(`/:id`, (req, res) => {
    new Note(req, res).getById();
});

/* DELETE NOTE by _id */
router.delete(`/:id`, (req, res) => {
    let auth = req.headers.authorization;

    let id = req.params.id;
    let details = {'_id': new ObjectID(id)};
    db.collection('notes').removeOne(details, (err, item) => {
        if (err) {
            res.send({'error': err});
        } else {
            res.send(item);
        }
    })
});

/* UPDATE NOTE by _id */
router.put(`/:id`, (req, res) => {
    let auth = req.headers.authorization;

    let id = req.params.id;
    let note = {text: req.body.body, title: req.body.title};
    let details = {'_id': new ObjectID(id)};
    db.collection('notes').updateOne(details, note, (err, item) => {
        if (err) {
            res.send({'error': err});
        } else {
            res.send(note);
        }
    })
});

module.exports = router;