
// import express from 'express';
// const authRouter = express.Router()

const express = require('express');
const authRouter =  express.Router()





authRouter.post("/signup", (req, res) => {
    //    console.log(req.body)
    //    res.send("Data received")
      const {name, email, password} = req.body;
        
      if(!email || !password || !name){
            return res.send("Please add all the fields")
        }
       // email 
       
       // password 

       // name

         // check if user already exists

})


// export default authRouter;

module.exports = authRouter;

