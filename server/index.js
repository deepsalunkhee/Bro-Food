const express =require('express');


const app=express();
const port= 5000||process.env.PORT;
const mongoDB=require('./db');
const cors = require('cors')
//alloeing the cross origin request 

mongoDB();
app.use(cors());

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Header",
//         "Origin, X-Requested-With, Content-Type,Accept"
//     );

//     next();
// })

app.get('/',(req,res)=>{
    res.send("Express server")
})
app.use(express.json());
app.use('/api', require("./Routes/CreateUser") )
app.use('/api', require("./Routes/DisplayData") )
app.use('/api', require("./Routes/OrderData") )

app.listen(port,()=>{
    console.log(`The server is running at port ${port}`)
})