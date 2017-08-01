/**
 * Created by Konstantin on 28.07.2017.
 */
let Notes = require('../schemas/notes.schema').Notes;
let ObjectID = require('mongodb').ObjectID;
let collection = 'notes';

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

    /**
     * ADD NEW NOTE TO DATABASE
     */
    add(){
        let item = {
            title: this.req.body.title,
            body: this.req.body.body,
            auth: this.auth };

        if (!(item.title && item.body && item.auth)) return this.res.send('You sent: ' + this.req.body + ' \nNOTE is: { title, body } ');

        let note = new Notes(item);
        note.save((err, res) => {
            if (err) return this.res.send(err.toJSON);
            this.res.send(res);
        });
    }

    /**
     * GET NOTE BY ID
     */
    get() {
        let id = this.req.params.id;
        let select = {_id: new ObjectID(id), auth: this.auth};

        if (!(select._id && select.auth)) return this.res.send('You can get NOTE by setting params: _id');

        db.collection(collection).findOne(select, (err, item) => {
            if (err) this.res.send({'error': err});
            this.res.send(item);
        })
    }

    /**
     * Get entire collection
     */
    getEntireCollection(){
        db.collection(collection).find({auth: this.auth}).toArray((err, results) => {
            this.res.send(results);
        })
    }

    /**
     * Delete item from collection by ID
     */
    delete(){
        let id = this.req.params.id;
        let select = {'_id': new ObjectID(id)};
        db.collection(collection).removeOne(select, (err, item) => {
            if (err) this.res.send({'error': err});
                this.res.send(item);
        })
    }

    /**
     * Update item in collection by ID
     */
    update() {
/*        let id = this.req.params.id;
        let item = {
            title: this.req.body.title,
            body: this.req.body.body
        };

        let select = {'_id': new ObjectID(id)};

        db.collection(collection).findById(id, (err, res) => {
            if (err) this.res.send({'error': err});
            res.title = this.req.body.title || res.title;
            res.body = this.req.body.body || res.body;
            res.auth = this.req.body.auth || res.auth;

            this.res.send(res);
        })*/
    }
};
