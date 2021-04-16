let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to our Book Model
let Survey = require('../models/survey');
let Result = require('../models/result');

/* GET Route for the Book list page - READ operation*/
router.get('/', (req,res,next)=>{
    Survey.find((err, surveyList)=>{
        if (err){
            return console.error(err);
        } else{
            //console.log(BookList);
            res.render('surveys/list', 
            {title: 'Surveys', 
            SurveyList: surveyList,
            displayName: req.user ? req.user.displayName : ''});

        }
    });
});

/* GET Route for displaying Take survey page - CREATE operation*/
router.get('/take/:id', (req,res,next)=>{
    let id = req.params.id;
    Survey.findById(id, (err, surveyToTake)=>{
        if (err){
            console.log(err);
            res.end(err);
        } else {
            res.render('surveys/take', {title: 'Take a Survey', survey: surveyToTake});
        }
    });
});

router.post('/take/:id', (req,res,next)=>{
    let id = req.params.id;
    let nameResult;
    let questionsResult = [];
    let answers = [];
    Survey.findById(id, (err, surveyToTake) =>{
        if(err){
            console.log(err);
            res.end(err);
        }else {
            questionsResult = surveyToTake.questions;
            nameResult = surveyToTake.name;
            for (let i = 0; i < questionsResult.length; i++){
                answers[i] = req.body['question'+`${i}`];
            }
            let newResult = Result({
                "name" : nameResult,
                "questions":questionsResult,
                "answers": answers
            });
            Result.create(newResult, (err, Result)=>{
                if (err){
                    console.log(err);
                    res.end(err);
                }else{
                    res.redirect('/survey-list');
                }
            });
        }
    });
});

/* GET Route for displaying Add page - CREATE operation*/
router.get('/add', (req,res,next)=>{
    res.render('surveys/add', {title: 'Add Survey'});
});
/* POST Route for processing Add page - CREATE operation*/
router.post('/add', (req,res,next)=>{
    let id = req.params.id;
    let name = req.body.name;
    let choices = [];
    let questions = [];
    let dataQuestions = req.body.questions;
    if (Array.isArray(dataQuestions)){
        questions = dataQuestions;
    } else{
        questions.push(dataQuestions);
    }
    for (let i = 0; i < questions.length; i++){
        choices[i] = req.body["choices" + `${i}`];
    }
    let newSurvey = Survey({
        "name": name,
        "questions": questions,
        "choices": choices
    });

    Survey.create(newSurvey, (err, Survey)=>{
        if (err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/survey-list');
        }
    });
});
/* GET Route for displaying the Edit page - Update operation*/
router.get('/edit/:id', (req,res,next)=>{
    let id = req.params.id;
    Survey.findById(id, (err, surveyToEdit) =>{
        if(err){
            console.log(err);
            res.end(err);
        }else {
            //show edit view
            res.render('surveys/edit', {title: "Edit Survey", survey: surveyToEdit});
        }
    });
});
/* POST Route for processing the Edit page - Update operation*/
router.post('/edit/:id', (req,res,next)=>{
    let id = req.params.id;
    let name = req.body.name;
    let choices = [];
    let questions = [];
    let dataQuestions = req.body.questions;
    if (Array.isArray(dataQuestions)){
        questions = dataQuestions;
    } else{
        questions.push(dataQuestions);
    }
    console.log(questions.length);
    for (let i = 0; i < questions.length; i++){
        choices[i] = req.body["choices" + `${i}`];
    }
    // console.log(name);
    // console.log(questions);
    // console.log(choices);
    let updateSurvey = Survey({
        "_id": id,
        "name": name,
        "questions": questions,
        "choices": choices
    });

    Survey.updateOne({_id:id}, updateSurvey, (err)=>{
        if (err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/survey-list');
        }
    });
});
/* GET Route to perform Deletion - DELETE operation*/
router.get('/delete/:id', (req,res,next)=>{
    let id = req.params.id;
    Survey.findById(id, (err, surveyToRemove)=>{
        if(err){
            console.log(err);
            res.end(err);
        }else {
            Result.remove({"name": surveyToRemove.name}, (err)=>{
                if(err){
                    console.log(err);
                    res.end(err);
                }
            })
        }
    });
    Survey.remove({_id:id}, (err) =>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/survey-list');
        }
    });
    
});

router.get('/results/:id', (req,res,next)=>{
    let id = req.params.id;
    Survey.findById(id, (err, surveyResults)=>{
        if(err){
            console.log(err);
            res.end(err);
        }else {
            Result.find({"name": surveyResults.name}, (error, resultList)=>{
                if (error){
                    res.render('surveys/result',{
                        title: "No results",
                        ResultList: resultList
                    });
                    //return console.error(error);
                } else{
                    res.render('surveys/result',{
                        title: "Results",
                        ResultList: resultList
                    });
                }
            });
        }
    });
});


module.exports = router;