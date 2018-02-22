var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
// var Event = require('../models')['Events'];
// var User = require('../models')['Users'];
var passport = require('passport');
var path = require('path');
// console.log(Event)

//index route
router.get('/', function (req, res){
  //asks to book a reservation or login with manager
  res.render('index');
});

router.get('/index', function (req, res){
  //asks to book a reservation or login with manager
  res.render('index');
});

router.get('/index1', function (req, res){
  //asks to book a reservation or login with manager
  res.render('index1');
});

//SIGN UP
router.get('/signup', function(req, res){
  res.render('signup');
});

router.get('/about', function(req, res){
  res.render('about');
});

router.get('/virtualtaproom', function(req, res){
  res.render('virtualtaproom');
});

router.get('/contact', function(req, res){
  res.render('contact');
});

router.get('/find', function(req, res){
  res.render('find');
});

// router.get('https://rhoward-paul.herokuapp.com', function(req, res){
//   res.render('rhoward-social');
// });

// router.get('/find', function(req, res){
//   res.render('find');
// });
router.post('/signup', function(req, res){
  //creates new user from valid form
  //if the email exists
  console.log(req.body);

   var newUser = [
    req.body.name,
    // phone: req.body.phone,
    req.body.email,
    req.body.password
  ];
     setTimeout(function(){
        res.redirect("/login");
     }, 2000);
   // res.redirect('login');
});

//LOGIN
router.get('/login', function(req, res){
  res.render('login');
});


router.post('/login', function(req, res){
  console.log(req.body);

  // User.findAll({
  //   where: {
  //     email: req.body.email,
  //     password: req.body.password
  //   }
  // }).then(function(data){
   
  //     if(data != ""){
     // res.sendFile(path.join(__dirname, "../public/brewbuddy/untitled"));
     setTimeout(function(){
        res.redirect("/index1");
     }, 2000);
     
        // res.redirect('/manager');
  //     } else{
  //       //need to add message saying the password and user didn't match
  //       console.log("username and password did not match");
  //       res.redirect('/login')
  //     }
  // });

});

//displays calendar of available dates
router.get('/reserve', function (req, res){
  Event.findAll({
    attributes: ['id', 'name', 'date', 'startTime', 'endTime', 'location', 'availableSpots']
  }).then(function(data){

    res.render('reserveUser', {evt: data});
  });
});

router.get('/manager', function(req,res){

  // Event.findAll({
  //   attributes:["id", "name", "date","startTime", "endTime", "location", "availableSpots"]
  // }).then(function(data){
   
      // res.sendFile(path.join(__dirname, "../public/brewbuddy/untitled.html"));
      // res.render('manager', {evt: data});
     
  // });
  // res.render('manager', {event: data});
});

//takes in the information user inputs to reserve a booking
router.post('/create/reservation', function (req, res){
  User.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email
  });
  //updates reservation and decreases available spots
  // res.redirect('/update/reservation/:id/:spots');
  res.redirect('/reserve');
});

//user can update the information of reservation
// router.put('/update/reservation/:id/:spots', function (req, res){
//   Event.update({
//     availableSpots: (req.body.spots) - 1
// },{
//   where:{
//     time: req.params.id
//   }
//  });
// });

//get customer information for the reservation
// router.get('/customerInfo/:id', function(req, res){
//   Customer.findAll({
//     where: {
//       id: req.params.id
//     }
//   });
// });

//manager creates new event
router.post('/create/event', function(req, res){
  Event.create({
    name: req.body.name,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    location: req.body.location,
    availableSpots: req.body.availableSpots
  });

  // res.redirect('/manager');
});

//allows manager to delete event on calendar
router.delete('/delete/event/:id', function(req, res){
  console.log(req.params.id);

  Event.destroy({
    where: {
      id: req.params.id
    }
  });

  // res.redirect('/manager')
});

module.exports = router;