/**
 * Created by kmalikov on 27.7.17.
 */
let Schema = require('mongoose').Schema;

let notes = new Schema({
    title: String,
    body: String,
    auth: String
}, {collection: 'notes'});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
notes.methods.anymethod = function () {
    // any actions
};

let Notes = db.model('Notes', notes);

module.exports = {
    Notes : Notes
};