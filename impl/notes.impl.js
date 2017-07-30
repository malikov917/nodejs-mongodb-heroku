/**
 * Created by Konstantin on 28.07.2017.
 */
let Notes = require('../schemas/notes.schema').Notes;
let ObjectID = require('mongodb').ObjectID;

module.exports = class Note {
    constructor(req, res){
        this.req = req;
        this.res = res;
        this.auth = req.headers.authorization;

        console.log(this.auth);
        if (this.auth)  {
            return this;
        } else {
            res.sendStatus(401);
            return;
        }
    }

    postOne(){
        let item = {
            title: this.req.body.title,
            body: this.req.body.body,
            auth: this.auth };
        let note = new Notes(item);

        db.collection('notes').insertOne(note, (err) => {
            if (err) return this.res.send(err.toJSON);
            this.res.send(note);
        });
    }

    getById() {
        let id = this.req.params.id;
        let details = {'_id': new ObjectID(id)};
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                this.res.send({'error': err});
            } else {
                this.res.send(item);
            }
        })
    }
};
