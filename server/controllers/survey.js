let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to survey model
let surveys = require('../models/surveys');

module.exports.displaySurvey = (req, res, next) => {
    surveys.find((err, Survey) => {
        if (err) {
            return console.error(err);
        }
        else {
            //    console.log(Survey);
            res.render('surveys',
             { title: 'surveys', 
             Survey: Survey, 
             displayName: req.user ? req.user.displayName: ''});
        }

    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('surveys/add', { title: 'Add Survey',
    displayName: req.user ? req.user.displayName: '' });

}

module.exports.processAddPage = (req, res, next) => {
    let newsurveys = surveys({
        "name": req.body.name,
        'author': req.body.author,
        "que1": req.body.que1,
        "que2": req.body.que2,
        "que3": req.body.que3,
        "que4": req.body.que4
    
  
    });
    surveys.create(newsurveys, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //refresh the Survey list.
            res.redirect("/surveys");
        }
    });

}
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    surveys.findById(id, (err, SurveyToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('surveys/edit', { title: 'Edit Survey', surveys: SurveyToEdit,
            displayName: req.user ? req.user.displayName: '' });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    
    let updatedSurvey = surveys({
        '_id' : id,
        "name": req.body.name,
        'author': req.body.author,
        "que1": req.body.que1,
        "que2": req.body.que2,
        "que3": req.body.que3,
        "que4": req.body.que4
        
    });
    surveys.updateOne({_id: id}, updatedSurvey, (err) =>{
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //refresh the Survey
            res.redirect("/surveys");
        }

    });

}
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    surveys.remove({_id: id}, (err)=> {

        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //refresh the Survey
            res.redirect("/surveys");
        }


    });


}



