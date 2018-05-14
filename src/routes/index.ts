import express = require('express')
import { Router } from 'express'

import Course from './api/courses'
import Subject from './api/subjects'
import Teacher from './api/teachers'
import Student from './api/students'

const route:Router = express.Router()

route.use('/courses',Course)
route.use('/subjects',Subject)
route.use('/teachers',Teacher)
route.use('/students',Student)

export default route