"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
var sequelize = null;
console.log(process.env.DATABASE_URL);
if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new sequelize_1.default(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        port: 5432,
        host: 'ec2-23-23-247-245.compute-1.amazonaws.com',
        logging: true //false
    });
}
else {
    // the application is executed on the local machine ... use mysql
    // sequelize = new Sequelize('example-app-db', 'root', null)
    sequelize = new sequelize_1.default('LearningManagement', 'sunny', 'sunny', {
        host: 'SUNNY3147223',
        dialect: 'mssql',
        pool: {
            max: 5,
            min: 0
        },
    });
}
const db = sequelize;
exports.Course = db.define('courses', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Student = db.define('students', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    age: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    email: {
        type: sequelize_1.default.STRING
    }
});
exports.Teacher = db.define('teachers', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.default.STRING
    }
});
exports.Subject = db.define('subjects', {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Batch = db.define('batches', {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    startYear: sequelize_1.default.INTEGER
});
exports.Lecture = db.define('lectures', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
});
exports.StudentBatch = db.define('studentbatch', {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true
    }
});
exports.Course.hasMany(exports.Subject);
exports.Subject.belongsTo(exports.Course);
exports.Course.hasMany(exports.Batch);
exports.Batch.belongsTo(exports.Course);
exports.Subject.hasMany(exports.Teacher);
exports.Teacher.belongsTo(exports.Subject);
exports.Batch.hasMany(exports.Lecture);
exports.Lecture.belongsTo(exports.Batch);
exports.Subject.hasMany(exports.Lecture);
exports.Lecture.belongsTo(exports.Subject);
exports.Teacher.hasMany(exports.Lecture);
exports.Lecture.belongsTo(exports.Teacher);
exports.Student.belongsToMany(exports.Batch, { through: exports.StudentBatch });
exports.Batch.belongsToMany(exports.Student, { through: exports.StudentBatch });
function dbRefresh() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db.authenticate();
            yield db.sync({ force: false });
        }
        catch (err) {
            console.log(err);
        }
    });
}
dbRefresh();
exports.default = exports.Course;
