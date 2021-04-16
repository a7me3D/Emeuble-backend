const User = require("../models/user")
const jwt = require("jsonwebtoken");


exports.login = (req, res) => {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        console.log(err)
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      if (!user) {
        console.log("No user found.")
        res.status(401).json({
          message: "Auth failed"
        });
      }
      if (!user.validPassword(req.body.password)) {
        req.flash('error', 'Wrong password');
        res.status(401).json({
          message: "Auth failed"
        });
      }
      if(user) {
        console.log("logged in")
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id
          },
          process.env.SECRET,
          {
            expiresIn: "12h"
          }
        );
        return res.status(200).json({
          message: "Auth successful",
          token: token,
          uid: user._id
        });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  }


exports.register = async (req, res) => {
    try {
        const user = new User()
        user.email = req.body.email,
        user.firstName = req.body.firstName,
        user.lastName = req.body.lastName,
        user.adress = req.body.adress,
        user.password = user.encryptPassword(req.body.password),
        user.created_At = Date.now()

        User.findOne({ email: req.body.email }, function (err, result) {
          if (result) {
            console.log("User already exists")
            return res.status(401).json({message: "Email already exists"});
          }
          else{
            user.save((error, result) => {
              if (error) {
                  console.log(error)
                  res.status(500).json({
                  message: "An error has occured."
                  })
              } else {
                  res.status(201).json({
                      message: "User created."
                  });
              }
            })
          }
         
        })

        
    } catch(e) {
        console.log(e)
        res.status(500).json({
            message: "An error has occured."
        })
    }
}