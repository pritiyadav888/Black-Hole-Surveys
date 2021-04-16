let mongoose = require('mongoose');

let surveyModel = mongoose.Schema({
    name: String,
    questions: [String],
    choices: [[]]
}, {
    collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);