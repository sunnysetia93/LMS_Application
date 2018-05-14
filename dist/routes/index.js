"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const courses_1 = __importDefault(require("./api/courses"));
const subjects_1 = __importDefault(require("./api/subjects"));
const teachers_1 = __importDefault(require("./api/teachers"));
const students_1 = __importDefault(require("./api/students"));
const route = express.Router();
route.use('/courses', courses_1.default);
route.use('/subjects', subjects_1.default);
route.use('/teachers', teachers_1.default);
route.use('/students', students_1.default);
exports.default = route;
