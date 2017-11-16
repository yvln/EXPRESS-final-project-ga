const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');

const Auth 		= require('../services/auth');
const User 		= require('../models/user');

// Authentication

router.get('/validate',
	Auth.restrict,
	(req, res) => {
	  res.json({
			fname: req.user.fname,
			lname: req.user.lname,
	    email: req.user.email,
	    token: req.user.token,
	    id: req.user.id
	  })
});

router.post('/signup', (req, res) => {
  const email = req.body.email.toLowerCase();
  const {fname, lname, username, date_registr, password, password_confirmation, level, number_try_game, picture} = req.body;
	const errors = {
		fname: [],
		lname: [],
		email: [],
    username: [],
    password: [],
    password_confirmation: []
  };
  let error = false;
	Object.keys(errors).forEach( key => {
		if( !req.body[key] ){
      errors[key].push(`${key} is required`);
      error = true;
    }
  })
  if (password !== password_confirmation){
    errors.password_confirmation.push("Password does not match confirmation.");
    error = true;
  }
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)){
    errors.email.push("Not a valid email address.");
    error = true;
  }
	User.findByEmail(email)
		.then( resp => {
			if ( resp !== null ) {
				errors.email.push("Email address already taken");
				error = true;
			}
			if (!error){
		    User
		      .generateToken(User.create, fname, lname, email, username, date_registr, password, level, number_try_game, picture)
		      .then(data => {
		        res.json(data)
		      })
		      .catch(err => console.log(err))
		  } else {
		    res.status(400).json({errors: errors})
		  }
		})
});

router.post('/login', (req, res) => {
  User.findByEmail(req.body.email.toLowerCase())
    .then( data => {
      if (data) {
        if(bcrypt.compareSync(req.body.password, data.password_digest)) {
          return User.generateToken(User.updateToken, data.id);
        } else {
          res.status(401).json({ errors: {password: 'Incorrect Password'} });
        }
      } else {
        res.status(401).json({ errors: {email: 'Incorrect Email'} });
      }
    })
    .then( user => {
      res.json(user);
    });
});

// Quand signup avec un email existant => refuser
	
module.exports = router;
