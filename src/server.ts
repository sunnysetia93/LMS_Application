import express, { Router }  from 'express';
import api from './routes/index';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',express.static(__dirname + '/../public_static'))
app.use('/',api)

app.listen(8080,()=>
{
    console.log("server running")
});