import express, { Router }  from 'express';
import api from './routes/index';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',express.static(__dirname + '/../public_static'))
app.use('/',api)

let PORT = process.env.PORT ||8080;
app.listen(PORT,()=>
{
    console.log("server running")
});