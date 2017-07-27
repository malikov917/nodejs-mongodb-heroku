let express = require('express');
let router = express.Router();
let ObjectID = require('mongoose').ObjectID;
let Kitten = require('../schemas/kitty.schema').Kitten;

/* POST new NOTE. */
router.post('/', function (req, res) {
    let note = {title: req.body.title, body: req.body.body };
    if (note.title && note.body) {
        db.collection('notes').insertOne(note, (err, response) => {
            if (err) {
                res.send(err);
            } else {
                res.send(note);
            }
        });
    } else {
        res.writeHead(400, {"Content-Type": "application/json"});
        res.write('Fields `title` and `body` are required!');
        res.end();
    }
});

/* GET all NOTES */
router.get('/', (req, res) => {
    db.collection('notes').find().toArray((err, results) => {
        res.send(results);
    })
});

/* TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST  */
router.get('/test', (req, res) => {
    var fluffy = new Kitten({ name: 'fluffy', age: '4' });
    fluffy.speak(); // "Meow name is fluffy"
    db.collection('cats').find().toArray((err, results) => {
        if (err) return res.send(err);
        res.send(results);
    })
});

/* GET NOTE by _id */
router.get(`/:id`, (req, res) => {
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