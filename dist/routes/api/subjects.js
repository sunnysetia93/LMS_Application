"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const db_1 = require("../../db");
const route = express.Router();
route.get('/', (req, res) => {
    db_1.Subject.findAll()
        .then((data) => {
        res.status(200).json(data);
    })
        .catch(err => {
        res.status(404).json({
            messsage: "Error in fetching data! " + err
        });
    });
});
route.get('/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({
            message: "id should be a number"
        });
    }
    else {
        db_1.Subject.findById(req.params.id)
            .then(data => {
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(404).json({
                    message: "no Subject with respect to this ID"
                });
            }
        })
            .catch(err => {
            res.status(400).json({
                error: 'Error in finding :' + err
            });
        });
    }
});
route.get('/:id/teachers', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({
            message: "id should be a number"
        });
    }
    else {
        db_1.Subject.find({
            where: {
                id: req.params.id
            },
            include: [{
                    model: db_1.Teacher
                }]
        })
            .then((result) => {
            res.status(200).json(result);
        })
            .catch(err => {
            res.status(400).json({
                error: 'Error in finding :' + err
            });
        });
    }
});
// *** POST REQUEST ***
route.post('/', (req, res) => {
    db_1.Subject.create({
        name: req.body.name,
        courseId: req.body.courseId
    })
        .then((createdCourse) => {
        res.status(201).json({
            message: "Successfully Created!"
        });
    })
        .catch((err) => {
        res.status(400).json({
            error: 'Error in creating :' + err
        });
    });
});
// *** PUT REQUEST ***
route.put('/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({
            message: "id should be a number"
        });
    }
    else {
        db_1.Subject.find({
            where: {
                id: req.params.id
            }
        })
            .then((subject) => {
            if (subject) {
                subject.name = req.body.name;
                subject.save();
                res.status(201).json({
                    message: "Successfully Updated!"
                });
            }
            else {
                res.status(400).json({
                    message: "no subject found!"
                });
            }
        })
            .catch((err) => {
            res.status(400).json({
                error: 'Error in creating :' + err
            });
        });
    }
});
// *** DELETE REQUEST ***
route.delete('/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({
            message: "id should be a number"
        });
    }
    else {
        db_1.Subject.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((deletedSubject) => {
            res.status(200).json(deletedSubject);
        })
            .catch((err) => {
            res.status(400).json({
                error: 'Error in deleting :' + err
            });
        });
    }
});
exports.default = route;
