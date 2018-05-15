import Sequelize from 'sequelize'
import CourseModel from './models/Course'
import StudentModel from './models/Student'
import TeacherModel from './models/Teacher'
import SubjectModel from './models/Subject'
import BatchModel from './models/Batch'
import LectureModel from './models/Lecture'

var sequelize = null

  console.log(process.env.DATABASE_URL)
  if (process.env.DATABASE_URL) {

    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     5432,
      host:     'ec2-23-23-247-245.compute-1.amazonaws.com',
      logging:  true //false
    })
  } 
  else {
 
    sequelize = new Sequelize('LearningManagement','sunny','sunny',
    {
    host:'SUNNY3147223',
    dialect:'mssql',
    pool: {
        max: 5,
        min: 0
      },
    })
  }

const db = sequelize


export const Course = db.define<CourseModel,any>('courses',{
    id :{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

export const Student = db.define<StudentModel,any>('students',{
    id :{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    age:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING
    }
})

export const Teacher = db.define<TeacherModel,any>('teachers',{
    id :{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING
    }
})

export const Subject = db.define<SubjectModel,any>('subjects',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

export const Batch = db.define<BatchModel,any>('batches',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    startYear:Sequelize.INTEGER
})

export const Lecture = db.define<LectureModel,any>('lectures',{
    id :{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    }
})

export const StudentBatch = db.define<any,any>('studentbatch',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true
      }
})

Course.hasMany(Subject)
Subject.belongsTo(Course)

Course.hasMany(Batch)
Batch.belongsTo(Course)

Subject.hasMany(Teacher)
Teacher.belongsTo(Subject)

Batch.hasMany(Lecture)
Lecture.belongsTo(Batch)

Subject.hasMany(Lecture)
Lecture.belongsTo(Subject)

Teacher.hasMany(Lecture)
Lecture.belongsTo(Teacher)

Student.belongsToMany(Batch,{through:StudentBatch})
Batch.belongsToMany(Student,{through:StudentBatch})

async function dbRefresh()
{
    try{

        await db.authenticate();
        await db.sync({force:false})
    }
    catch(err)
    {
        console.log(err);
    }
}

dbRefresh();

export default Course

