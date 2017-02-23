var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://nitewalkr:passive@ds157509.mlab.com:57509/nitetodoapp', ['tasks'])

//DISPLAY, GET ALL TASKS
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err)
        {
            res.send(err);
        }
        res.json(tasks);
    });
});
//DISPLAY, GET SINGLE TASK
router.get('/task/:id', function(req,res,next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err)
        {
            res.send(err);
        }
        res.json(task);
    });
});

//STORE, POST REQUEST
router.post('/task', function(req, res, next){
    var task = req.body;
    if(!task.title || !(task.isDone + ''))
    {
        res.status(400);
        res.json({
            "error":"Bad data"
        });
    }
    else
    {
        db.tasks.save(task, function(err, task){
            if(err)
            {
                res.send(err);
            }
            res.json(task);
        });
    }
});

//UPDATE, PUT SINGLE TASK
router.put('/task/:id', function(req,res,next){
    var task = req.body;
    var updateTask = {};

    if(task.isDone)
    {
        updateTask.isDone = task.isDone;
    }
    if(task.title)
    {
        updateTask.isDone = task.title;
    }
    if(!updateTask)
    {
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }else{
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updateTask, {}, function(err, task){
        if(err)
        {
            res.send(err);
        }
        res.json(task);
    });
    }
    
});

//DELETE, DELETE TASK
router.delete('/task/:id', function(req,res,next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err)
        {
            res.send(err);
        }
        res.json(task);
    });
});

module.exports = router;