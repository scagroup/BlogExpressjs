"use strict"
var express = require('express');
var app = express();
var mongo = require("../moduls/getRoutesMangoDB");
var logger = require('morgan');

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(logger('dev'));

//Routes
app.use("*", function(req, res, next){
    //console.log("URL : " + req.path);
    mongo.getRoute(req.originalUrl).then(function(result, error){
        res.render("index", {
            title : result[0].title,
            body : result[0].body
        });
    }).catch(function (error) {
        logger(error);
        next();
    });
});

app.use(function (req, res){
    res.status(404);
    res.render("index", {
        title : "Page not found"
    })
});

module.exports = app;
