let mongoose = require('mongoose');

let resultModel = mongoose.Schema({
    name: String,
    questions: [String],
    answers: [String]
}, {
    collection: "results"
});

module.exports = mongoose.model('Result', resultModel);