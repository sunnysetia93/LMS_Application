/// <reference types="sequelize" />
import Sequelize from 'sequelize';
import CourseModel from './models/Course';
import StudentModel from './models/Student';
import TeacherModel from './models/Teacher';
import SubjectModel from './models/Subject';
import BatchModel from './models/Batch';
import LectureModel from './models/Lecture';
export declare const db: Sequelize.Sequelize;
export declare const Course: Sequelize.Model<CourseModel, any>;
export declare const Student: Sequelize.Model<StudentModel, any>;
export declare const Teacher: Sequelize.Model<TeacherModel, any>;
export declare const Subject: Sequelize.Model<SubjectModel, any>;
export declare const Batch: Sequelize.Model<BatchModel, any>;
export declare const Lecture: Sequelize.Model<LectureModel, any>;
export declare const StudentBatch: Sequelize.Model<any, any>;
export default Course;
