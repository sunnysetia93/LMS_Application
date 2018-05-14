"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const db_1 = require("../../db");
const route = express.Router();
route.get('/', (req, res) => {
    db_1.Student.findAll()
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
        db_1.Student.findById(req.params.id)
            .then(data => {
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(404).json({
                    message: "no Student with respect to this ID"
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
        db_1.Student.find({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: db_1.Batch
                }
            ]
        })
            .then((student) => {
            if (!student) {
                res.status(400).json({
                    message: "No Student found with this ID"
                });
            }
            else {
                res.status(200).json(student);
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
    db_1.Student.create({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
    })
        .then((createdStudent) => {
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
route.post('/enroll', (req, res) => {
    db_1.StudentBatch.create({
        studentId: req.body.studentId,
        batchId: req.body.batchId
    })
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        res.status(400).json({
            error: 'Error in creating :' + err
        });
    });
});
// *** PUT REQUEST ***
route.put('/:id', (req, res) => {
    db_1.Student.findById(req.params.id)
        .then((stud) => {
        if (stud) {
            stud.name = req.body.name;
            stud.age = req.body.age;
            stud.email = req.body.email;
            stud.save();
            res.status(201).json({
                message: "Successfully Updated!"
            });
        }
        else {
            res.status(400).json({
                message: "No Student found with this ID"
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
    db_1.Student.destroy({
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
