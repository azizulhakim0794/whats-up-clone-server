//import 
// const express  =  require('express');
// const cors = require('cors')
// const bodyParser = require('body-parser')
import express from 'express';
import mongoose from 'mongoose'
import Pusher from 'pusher'
import cors from 'cors'
import {} from 'dotenv/config'
// import {whatsMessage} from './whatsMessage'
// const whatsMessage = require('./whatsMessage')
import Messages from './dbMessages.js';
//app config
const app = express()
const port = process.env.PORT || 5000
const pusher = new Pusher({
    appId: "1255718",
    key: "055522bcc1fada11494e",
    secret: "8a8c048c381218f5cfff",
    cluster: "eu",
    useTLS: true
  });
  
//middleware
app.use(express.json())
app.use(cors())
//DB config
const connection__url = 'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0.hsgbd.mongodb.net/'+process.env.DB_NAME+'?retryWrites=true&w=majority'
mongoose.connect(connection__url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const db = mongoose.connection
db.once('open',()=>{
    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()
    changeStream.on("change",(change)=>{
        // console.log(change)
        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument
            pusher.trigger('messages','inserted',
            {
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                email:messageDetails.email,
            }
            );  
        }
        else{
        //    console.log('error trigger pusher')     
        };
    });
});

//api routes
app.get('/', (req, res) => res.status(200).send('hello world'))

app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })

})
app.post('/messages/new',(req,res)=>{
    const dbMessage = req.body
    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })

})
//listen
// app.use('/messages',whatsMessage)
app.listen(port)