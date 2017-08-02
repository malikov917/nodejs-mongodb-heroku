/**
 * Created by Konstantin on 28.07.2017.
 */
let Notes = require('../schemas/notes.schema').Notes;

module.exports = class Note {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.auth = req.headers.authorization;
    }

    /**
     * ADD NEW NOTE TO DATABASE v1
     */
    create() {
        let note = new Notes({
            title: this.req.body.title,
            body: this.req.body.body,
            auth: this.auth
        });
        note.save((err, res) => {
            if (err) return this.res.send(err);
            this.res.send(res);
        });
    }

    /**
     * GET NOTE BY ID v1
     */
    read() {
        let id = this.req.params.id;
        let select = {_id: id, auth: this.auth};

        Notes.findOne(select, (err, item) => {
            if (err) return this.res.status(500).send(err);
            if (item) {
                this.res.send(item);
            } else {
                this.res.send({message: 'No item found with that ID', id: id});
            }
        })
    }

    /**
     * Get entire collection v1
     */
    readEntireCollection() {
        Notes.find({auth: this.auth}, (err, results) => {
            if (err) return this.res.status(500).send(err);
            if (results) {
                this.res.send(results);
            } else {
                this.res.send({message: 'No results found'});
            }
        });
    }

    /**
     * Update item in collection by ID v1
     */
    update() {
        let id = this.req.params.id;

        Notes.findById(id, (err, res) => {
            if (err) return this.res.status(500).send(err);
            res.title = this.req.body.title || res.title;
            res.body = this.req.body.body || res.body;
            res.auth = this.req.body.auth || res.auth;

            res.save((err, res) => {
                if (err) return this.res.status(500).send(err);
                this.res.send(res);
            })
        });

    }

    /**
     * Delete item from collection by ID v1
     */
    delete() {
        let id = this.req.params.id;
        let select = {'_id': id, auth: this.auth};
        Notes.findByIdAndRemove(select, (err) => {
            if (err) return this.res.send(err);
            this.res.send({message: "Item successfully deleted", id: id});
        })
    }
};
