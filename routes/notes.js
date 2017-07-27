let express = require('express');
let router = express.Router();
let ObjectID = require('mongoose').ObjectID;
let Kitten = require('../schemas/kitty.schema').Kitten;
let Notes = require('../schemas/notes.schema').Notes;
/* POST new NOTE. */
router.post('/', function (req, res) {
    let auth = req.headers.authorization;

    let item = {title: req.body.title, body: req.body.body, auth: auth };
    let note = new Notes(item);
    db.collection('notes').insertOne(note, (err, resp) => {
        if (err) return res.send(err.toJSON);
        res.send(note);
    })
});

/* GET all NOTES */
router.get('/', (req, res) => {
    let auth = req.headers.authorization;

    db.collection('notes').find({auth: auth}).toArray((err, results) => {
        res.send(results);
    })
});

/* ПОЛУЧИТЬ КОШЕК ИЗ БАЗЫ ДАННЫХ  */
router.get('/test', (req, res) => {
    let auth = req.headers.authorization;

    db.collection('cats').find({auth: auth}).toArray((err, results) => {
        if (err) return res.send(err);
        res.send(results);
    })
});

/* ЗАСУНУТЬ КОШКУ В БАЗУ ДАННЫХ  */
router.post('/test', (req, res) => {
    let auth = req.headers.authorization;

    let fluffy = new Kitten({
        name: req.body.name,
        age: req.body.age,
        auth: auth
    });

    db.collection('cats').insertOne(fluffy, (err, results) => {
        if (err) return res.send(err);
        res.send(fluffy);
    })
});

/* GET NOTE by _id */
router.get(`/:id`, (req, res) => {
    let auth = req.headers.authorization;

    let id = req.params.id;
    let details = {'_id': new ObjectID(id)};
    db.collection('notes').findOne(details, (err, item) => {
        if (err) {
            res.send({'error': err});
        } else {
            res.send(item);
        }
    })
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