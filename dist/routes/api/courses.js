"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const db_1 = require("../../db");
const route = express.Router();
route.get('/', (req, res) => {
    db_1.Course.findAll()
        .then((data) => {
        res.status(200).json(data);
    })
        .catch(err => {
        res.status(400).json({
            error: 'Error in finding :' + err
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
        db_1.Course.findById(req.params.id)
            .then((data) => {
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(404).json({
                    message: "no course with respect to this ID"
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
        db_1.Batch.findAll({
            where: {
                courseId: req.params.id
            }
        })
            .then((result) => {
            if (result) {
                res.status(200).json(result);
            }
            else {
                res.status(404).json({
                    message: "no batches with respect to this ID"
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
route.get('/:id/batches/:batchId', (req, res) => {
    if (isNaN(req.params.id) || isNaN(req.params.batchId)) {
        res.status(400).json({
            message: "id should be a number"
        });
    }
    else {
        db_1.Batch.find({
            where: {
                courseId: req.params.id,
                id: req.params.batchId
            }
        })
            .then((result) => {
            if (result) {
                res.status(200).json(result);
            }
            else {
                res.status(404).json({
                    message: "no batches with respect to this ID"
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
route.get('/:id/batches/:batchId/lectures', (req, res) => {
    if (isNaN(req.params.id) || isNaN(req.params.batchId)) {
        res.status(400).json({
            message: "id should be a number"
        });
    }
    else {
        db_1.Batch.find({
            where: {
                id: req.params.batchId,
                courseId: req.params.id
            }
        })
            .then((data) => {
            if (data) {
                db_1.Lecture.findAll({
                    where: {
                        batchId: req.params.batchId
                    }
                })
                    .then((result) => {
                    res.status(200).json(result);
                });
            }
            else {
                res.status(404).json({
                    message: "no batches with respect to this ID"
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
route.get('/:id/batches/:batchId/lectures/:lectId', (req, res) => {
    if (isNaN(req.params.id) || isNaN(req.params.batchId) || isNaN(req.params.lectId)) {
        res.status(400).json({
            message: "id should be a number"
        });
    }
    else {
        db_1.Batch.find({
            where: {
                id: req.params.batchId,
                courseId: req.params.id
            }
        })
            .then((data) => {
            if (data) {
                db_1.Lecture.find({
                    where: {
                        batchId: req.params.batchId,
                        id: req.params.lectId
                    }
                })
                    .then((result) => {
                    res.status(200).json(result);
                });
            }
            else {
                res.status(404).json({
                    message: "no batches with respect to this ID"
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
route.get('/:id/batches/:batchId/students', (req, res) => {
    db_1.Batch.find({
        where: {
            id: req.params.batchId,
            courseId: req.params.id
        },
        include: [{
                model: db_1.Student
            }]
    })
        .then((result) => {
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(200).json({
                message: "No result found!"
            });
        }
    })
        .catch((err) => {
        res.status(400).json(err);
    });
});
route.get('/:id/batches/:batchId/teachers', (req, res) => {
    db_1.Batch.find({
        where: {
            id: req.params.batchId,
            courseId: req.params.id
        },
        include: [
            {
                model: db_1.Course,
                attributes: ['id', 'name'],
                include: [
                    {
                        model: db_1.Subject,
                        attributes: ['id', 'name'],
                        include: [
                            {
                                model: db_1.Teacher,
                                attributes: ['id', 'name', 'email']
                            }
                        ]
                    }
                ]
            }
        ]
    })
        .then((result) => {
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(200).json({
                message: "No result found!"
            });
        }
    })
        .catch((err) => {
        res.status(400).json(err);
    });
});
// *** POST REQUEST ***
route.post('/', (req, res) => {
    db_1.Course.create({
        name: req.body.name
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
route.post('/:id/batches', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({
            message: "id should be a number"
        });
    }
    else {
        db_1.Course.findById(req.params.id)
            .then((data) => {
            if (data) {
                db_1.Batch.create({
                    name: req.body.name,
                    startYear: req.body.startYear,
                    courseId: req.params.id
                })
                    .then((createdBatch) => {
                    res.status(201).json({
                        message: "Successfully Created!"
                    });
                });
            }
            else {
                res.status(404).json({
                    message: "No course ID found"
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
route.post('/:id/batches/:batchId/lectures', (req, res) => {
    if (isNaN(req.params.id) || isNaN(req.params.batchId)) {
        res.status(400).json({
            message: "id should be a number"
        });
    }
    else {
        db_1.Batch.find({
            where: {
                id: req.params.batchId,
                courseId: req.params.id
            }
        })
            .then((data) => {
            if (data) {
                db_1.Lecture.create({
                    batchId: req.params.batchId,
                    teacherId: req.body.teacherId,
                    subjectId: req.body.subjectId
                })
                    .then((result) => {
                    res.status(200).json({
                        message: "Successfully Created!"
                    });
                });
            }
            else {
                res.status(404).json({
                    message: "no batches with respect to this ID"
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
// *** PUT REQUEST ***
route.put('/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({
            message: "id should be a number"
        });
    }
    else {
        db_1.Course.findById(req.params.id)
            .then((course) => {
            if (course) {
                course.name = req.body.name;
                course.save();
                res.status(200).json({
                    message: "updated!"
                });
            }
            else {
                res.status(404).json({
                    message: "no course with respect to this ID"
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
route.put('/:id/batches/:batchId', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({
            message: "id should be a number"
        });
    }
    else {
        db_1.Batch.find({
            where: {
                id: req.params.batchId,
                courseId: req.params.id
            }
        })
            .then((batch) => {
            if (batch) {
                batch.name = req.body.name;
                batch.startYear = req.body.startYear;
                batch.save();
                res.status(200).json({
                    message: "updated!"
                });
            }
            else {
                res.status(404).json({
                    message: "No course ID found"
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
exports.default = route;
