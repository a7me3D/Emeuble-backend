const User = require("../models/user")

exports.getUser = (req, res) => {
    User.findOne({ _id: req.params.uid }, function (err, user) {
      if (err) {
        console.log(err)
        return res.status(401).json({
          message: "User does not exist."
        });
      }
      if (user) {
        console.log("logged in")
        return res.status(200).json({
          message: "user found",
          uid: user._id,
          email: user.email,
          joined: user.created_At
        });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  }