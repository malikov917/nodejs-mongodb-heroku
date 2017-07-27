/**
 * Created by kmalikov on 27.7.17.
 */
let Schema = require('mongoose').Schema;

let notes = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: false},
    auth: String
}, {collection: 'notes'});

let Notes = db.model('Notes', notes);

module.exports = {
    Notes : Notes
};