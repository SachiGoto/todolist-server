
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
require('dotenv').config();
let PORT = 3000;



const MongoClient = require('mongodb').MongoClient;

const connectionString = process.env.DB_STRING;


MongoClient.connect(connectionString, {useUnifiedTopology:true})
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('to-do-list')
    const task = db.collection('task')

    app.get('/', (req,res)=>{
    // res.sendFile(__dirname + '/index.html')
    // res.send('Hello Vancouver')
    db.collection('task').find().toArray()
    .then(results=>{
      // results is an array //  
        // console.log(results);

        res.json(results);
        // res.render('index.ejs', {task:results})
        // padding results(data) into ejs. name data as task in this case
    })
    .catch(error=> console.error(error))
    })
  

  //  '/task' comes from action in the form // 
    app.post('/task', (req, res) => {
        console.log(req.body);
        task.insertOne({task: req.body.task, completed:false})
          .then(result => {
            res.redirect('/');
            // res.json({
            //     message:"successful"
            // })
            console.log(result)
          })
          .catch(error => console.error(error))
      })
    
 
 

  app.put('/markComplete', (req,res)=>{
    console.log(req.body);
    const ObjectId = require("mongodb").ObjectId;
    db.collection('task').updateOne({_id:ObjectId(req.body._id)},{

     $set:{
      completed:req.body.completed
     }
     },{
      // sorting order and find first match
         sort:{_id:-1},
         // upsert:true -> if there is data that doesn't exsist, it will insert the data.
         upasert:false
     })
     .then(result=>{
      console.log('completed');
      res.json({result:result})
     })
     .catch(error => console.error(error))

  
  })

  // app.put('/markUnComplete', (req,res)=>{
  //   // console.log(req.body);
  //   db.collection('task').updateOne({task: req.body.taskFromJS},{

  //    $set:{
  //     completed: false
  //    }
  //    },{
  //     // sorting order and find first match
  //        sort:{_id:-1},
  //        // upsert:true -> if there is data that doesn't exsist, it will insert the data.
  //        upasert:false
  //    })
  //    .then(result=>{
  //     console.log("result is" , result);
  //     res.json({message:'testing from backend'},{result:result})
  //    })
  //    .catch(error => console.error(error))

  
  // })


  app.delete('/deleteTask/:id',(req,res)=>{
   
    const ObjectId = require("mongodb").ObjectId;
    let id = req.params.id;
    // console.log("req.body.task is " ,req.body.id);
    db.collection('task').deleteOne({_id:ObjectId(id)})
    .then(result=>{
        console.log( 'deleted')
        res.json( 'deletd')

    })
    .catch(error=> console.log(error));
  })


})

// app.listen(3000, function() {
//     console.log('listening on 3000')
//   })
app.listen(process.env.PORT || PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})

