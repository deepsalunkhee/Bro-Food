const express= require('express');

const router = express.Router();

//to creta eht eroutes
const User =require('../models/User')
const {body,validationResult}=require('express-validator');
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')
const jwtSecret ="djfhahfasjhlkdjahfasfhhfsskhfasklhfsfaskhfskjaf"




router.post('/createuser',
body('email').isEmail(),
body('name').isLength({min:5}),
body('password','format misss matched').isLength({min:5})
,async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }

    const salt =  await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt);
    try {
        await User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.name
        })
         

        res.json({success:true});
        
        
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
});

router.post("/loginuser", 
body('email').isEmail(),
body('password','Incorrrect password format').isLength({min:5})
,async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    

    let email=req.body.email;
    try {
        let userData = await User.findOne({email});
        if(!userData)
        {
            return res.status(400).json({errors:"Incorrect credentials"});
        }

        const pwdcompare = await bcrypt.compare(req.body.password,userData.password) 
        if(!pwdcompare)
        {
            return res.status(400).json({errors:"Incorrect password "});
        }

        const data ={
            user:{
                id:userData.id
            }
        }

        const authToken = jwt.sign(data,jwtSecret)

        return res.json({success:true,authToken:authToken});
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})

module.exports =router;


// name:"Deep",
// password:"123456",
// email:"deep@gmail,com",
// location:"fnd;akjak;"

// This is a Node.js module that defines a router object for handling HTTP requests related to creating and logging in users. It uses the Express framework for handling routes and middleware.

// The module starts by requiring the necessary dependencies, which include the express, bcryptjs, jsonwebtoken, and express-validator modules. The express module is used to create an instance of an Express application, while the bcryptjs module is used to encrypt user passwords. The jsonwebtoken module is used to create and verify JSON Web Tokens (JWTs), which are used for authentication. The express-validator module is used for input validation and sanitization.

// After requiring the necessary dependencies, the module creates a router object using the express.Router() method. The router object is used to define the routes and middleware for handling HTTP requests.

// The first route defined is a POST route for creating a new user. It uses the body() method from the express-validator module to define validation rules for the request body. If there are any validation errors, the route returns a 400 Bad Request response with an array of error messages. If there are no validation errors, the route uses the bcryptjs module to hash the user's password and then creates a new user in the database using the User.create() method.

// The second route defined is a POST route for logging in a user. It also uses the body() method from the express-validator module to define validation rules for the request body. If there are any validation errors, the route returns a 400 Bad Request response with an array of error messages. If there are no validation errors, the route retrieves the user data from the database using the User.findOne() method and then uses the bcryptjs module to compare the user's input password with the hashed password stored in the database. If the passwords match, the route creates a JWT using the jsonwebtoken module and returns a success response with the JWT.

// Finally, the module exports the router object using the module.exports statement, which makes it available to other modules that require it.




