
// const express  =  require('express');
// const cors = require('cors')
// const {MongoClient} = require('mongodb')
// const bodyParser = require('body-parser');
// const Pusher  = require('pusher')
// require('dotenv').config()
// const router = express.Router()
// const app = express();

// const pusher = new Pusher({
//     appId: "1255718",
//     key: "055522bcc1fada11494e",
//     secret: "8a8c048c381218f5cfff",
//     cluster: "eu",
//     useTLS: true
//   });
// app.use(cors());
// app.use(bodyParser.json())
// const uri = `mongodb+srv://${process.env.DB_USER }:${process.env.DB_PASS}@cluster0.hsgbd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
//   const messageContentsCollection = client.db("whatsUpDB").collection("messagecontents");
//   // perform actions on the collection object

//   router.post('/new',(req,res,next)=>{
//     const name = req.body.name
//     const message = req.body.message
//     const email = req.body.email
//     const timestamp = req.body.timestamp
//     console.log(name,message,email,timestamp)
//         messageContentsCollection.insertOne({name:name, message:message,email:email,timestamp:timestamp})
//         .then(result => {
//             if(result.insertedCount > 0){
//                 pusher.trigger('messages','inserted',
//                 {
//                     name:name,
//                     message:message,
//                     timestamp:timestamp,
//                     email:email
//                 }
//                 );
//                 console.log('submitting')
//                 res.states(201).send(result.insertedCount > 0);
//             }

//           })
//     })
//     router.get('/sync',(req,res,next)=>{
//       messageContentsCollection.find({})
//       .toArray((err,documents)=>{
//         if(documents){
//           res.status(200).send(documents)
//         }
//         else{
//           res.status(500)
//         }
//       })
//     })
//     })
//     module.exports = router

