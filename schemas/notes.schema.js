/**
 * Created by kmalikov on 27.7.17.
 */
let Schema = require('mongoose').Schema;

let notes = new Schema({
    title: String,
    body: String,
    auth: String
});

let Notes = db.model('Notes', notes);

module.exports = {
    Notes : Notes
};