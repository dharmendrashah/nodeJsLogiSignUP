const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//user model
const User = require('../models/User');

//login
router.get('/login', (req, res) => res.render('login'));

//register
router.get('/register', (req, res) => res.render('register'));

//register handle
router.post('/registerThis', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //check require feilds

    if(!name || !email || !password || !password2){
        errors.push({msg: "please fill in all the feilds"});
    }
    //check password match
    if(password != password2){
        errors.push({msg: 'passwords do not match'});
    }
    //there is no such password
    if(!password){
        errors.push({msg:'please type password'});
    }

    //password length
    if(password.length < 6){
        errors.push({msg: 'password at least 6 character'})
    }

    if(password.length = 0){
        errors.push({msg: 'Please fill the password to continue'})
    }

    if(password.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
         //validation passed
         User.findOne({ email:email }).then(user => {
             if (user) {
                 //user existes
                 errors.push({msg: 'User with this email already exists'});
                 res.render('register', {
                     errors,
                     name,
                     email,
                     password,
                     password2
                 });
             }else{
                 //creating new user
                 const newUser = new User({
                     name,
                     email,
                     password
                 });

                console.log(newUser);
                 res.send('hello');
             }
         })
       // console.log('this is something')
    }
});

module.exports = router;