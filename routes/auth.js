
// import express from 'express';
// const authRouter = express.Router()
// import mongoose from "mongoose";
// const user =  mongoose.model("User");
// import bcrypt from "bcrypt";

const express = require('express');
const authRouter =  express.Router()
const mongoose = require("mongoose");
const user =  mongoose.model("User");
const bcrypt = require("bcrypt");



authRouter.post("/signup", (req, res) => {
    //    console.log(req.body)
    //    res.send("Data received")
      const {name, email, password} = req.body;

      // validations: 

      if(!name || !email || !password){
          return res.send({error: "Please add all the fields"})
      }
     
      
      //  check if user email already exists in database: 

       user.findOne({email: email})
       .then(
            (savedUser)=>{
                if(savedUser){
                    return res.send({error: "User already exists with that email"})
                }
                
                bcrypt.hash(password, 10)
                .then((hashedPassword)=>{
                  // creating a new user object for User Model
                     if(!hashedPassword){
                        return res.send({error: "Password not hashed"})
                     }
          
          
                      let newUser = new user({
                        name: name,
                        email: email,
                        password: hashedPassword
                    })
          
                    newUser.save()  // async in nature
                    .then((savedUser)=>{
                       if(!savedUser){
                          return res.send({error: "User not saved"})
                       }
                       return res.send({success: true, message: "User saved successfully", data: savedUser})
                    })
                    .catch(err => console.log(err))
          
                })
          
                .catch(err=>console.log(err))

            }
       )

       .catch(err=>console.log(err))


      // let newUser = new user({
      //    name, email, password
      // })
      // password hashing: 

     

})


authRouter.post("/login", (req, res) => {
      const {email, password} = req.body;

      if(!email || !password){
         return res.send({error: "Please add all the fields"})
      }
      // email validation //  regex 
      
      user.findOne({email: email})
        .then((foundUser)=>{
              console.log("foundUser", foundUser)// {id: , name: "abhi", email: "abhi", password: ""}
              if(foundUser == null){
                  return res.send({error: "User not found"})
              }
              // compare password:
              bcrypt.compare(password, foundUser.password)
                .then((result)=>{
                     if(result == false){
                        return res.send({error: "Invalid password"})
                     }
                    return res.send({success: true, message: "User logged in successfully", data: foundUser})
                })

        })


      .catch(err=>console.log("issue while searching email in datbase",err))



})


// export default authRouter;

module.exports = authRouter;

