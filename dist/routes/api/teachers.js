"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const db_1 = require("../../db");
const route = express.Router();
route.get('/', (req, res) => {
    db_1.Teacher.findAll()
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
        db_1.Teacher.findById(req.params.id)
            .then(data => {
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(404).json({
                    message: "no Teacher with respect to this ID"
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
route.get('/:id/batches', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({
            message: "id should be a number"
        });
    }
    else {
        db_1.Teacher.find({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: db_1.Subject,
                    attributes: ['id'],
                    include: [{
                            model: db_1.Course,
                            attributes: ['id'],
                            include: [{
                                    model: db_1.Batch
                                }]
                        }]
                }
            ]
        })
            .then((teacher) => {
            if (!teacher) {
                res.status(400).json({
                    message: "No teacher found with this ID"
                });
            }
            else {
                res.status(200).json(teacher);
            }
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
    db_1.Teacher.find({
        where: {
            email: req.body.email
        }
    })
        .then((result) => {
        if (result) {
            res.status(400).json({
                message: "This Teacher already teaches a subject."
            });
        }
        else {
            db_1.Teacher.create({
                name: req.body.name,
                email: req.body.email,
                subjectId: req.body.subjectId
            })
                .then((createdTeacher) => {
                res.status(201).json({
                    message: "Successfully Created!"
                });
            });
        }
    })
        .catch((err) => {
        res.status(400).json({
            error: 'Error in creating :' + err
        });
    });
});
// *** PUT REQUEST ***
route.put('/:id', (req, res) => {
    db_1.Teacher.findById(req.params.id)
        .then((teacher) => {
        if (teacher) {
            teacher.name = req.body.name;
            teacher.email = req.body.email;
            teacher.save();
            res.status(201).json({
                message: "Successfully Updated!"
            });
        }
        else {
            res.status(400).json({
                message: "No Teacher found with this ID"
            });
        }
    })
        .catch((err) => {
        res.status(400).json({
            error: 'Error in creating :' + err
        });
    });
});
// *** DELETE REQUEST ***
route.delete('/:id', (req, res) => {
    db_1.Teacher.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((deleted) => {
        res.status(200).json({
            deletedStatus: deleted
        });
    })
        .catch((err) => {
        res.status(400).json({
            error: 'Error in creating :' + err
        });
    });
});
exports.default = route;
