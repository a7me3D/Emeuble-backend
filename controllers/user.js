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
          firstname: user.firstName,
          lastname: user.lastName,
          adress: user.adress,
          phone: user.phone,
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

exports.getUsers = async (req,res) =>{
  try{
    const users = await User.find().lean()
    return res.status(200).json(users)
  }catch{
      return res.status(500).json({message:"Internal server error"})
  }
}

exports.updateUser = (req, res) => {
  const userId = req.params.id
  User.findByIdAndUpdate(userId, req.body,  (err, user) => {
    if(err) return res.status(500).json({message:"Internal server error"})
    else return res.status(200).json({message:"User updated"})
  })
}