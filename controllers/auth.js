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
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      if (!user.validPassword(req.body.password)) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      if(user) {
        console.log("logged in")
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id,
            isAdmin: user.isAdmin
          },
          process.env.SECRET,
          {
            expiresIn: "12h"
          }
        );
        return res.status(200).json({
          message: "Auth successful",
          token: token,
          uid: user._id,
          ...(user.isAdmin && {isAdmin: true})
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
        user.email = req.body.user.email,
        user.firstName = req.body.user.firstName,
        user.lastName = req.body.user.lastName,
        user.adress = req.body.user.adress,
        user.phone = req.body.user.phone,
        user.password = user.encryptPassword(req.body.user.password),
        user.created_At = Date.now()

        User.findOne({ email: req.body.user.email }, function (err, result) {
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