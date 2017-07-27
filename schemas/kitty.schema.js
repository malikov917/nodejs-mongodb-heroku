/**
 * Created by kmalikov on 27.7.17.
 */
let Schema = require('mongoose').Schema;

let kittySchema = Schema({
    name: {type: String, required: true},
    age: {type: String, required: false}
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
    let greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
};


let Kitten = db.model('Kitten', kittySchema);

module.exports = {
    Kitten : Kitten
};