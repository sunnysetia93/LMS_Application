import express, { Router }  from 'express';
import api from './routes/index';
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();

const app = express();

app.use(cors())


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',express.static(__dirname + '/../public_static'))
app.use('/',api)

let PORT = process.env.PORT ||8080;
app.listen(PORT,()=>
{
    console.log("server running")
});