let express = require('express');
let router = express.Router();
let Note = require('../impl/notes.impl');

/* Add new NOTE to database */
router.post('/', function (req, res) {
    new Note(req, res).create();
});

/* Get NOTE by id */
router.get(`/:id`, (req, res) => {
    new Note(req, res).read();
});

/* Get entire COLLECTION */
router.get('/', (req, res) => {
    new Note(req, res).readEntireCollection();
});

/* Delete NOTE by id */
router.delete(`/:id`, (req, res) => {
    new Note(req, res).delete();
});

/* Update NOTE by id */
router.put(`/:id`, (req, res) => {
    new Note(req, res).update();
});

module.exports = router;