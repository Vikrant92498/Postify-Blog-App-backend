const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt= require('jsonwebtoken')
exports.userRegister = async (req, res) => {
    const {username , email,password } = req.body;
    try{ 
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = new User({
        username: username,
        email: email,
        password: hashedPass,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};
 

exports.userLogin = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return res.status(400).json("Wrong credentials!");
        }
        const validated = await bcrypt.compare(password, user.password);
        if (!validated) {
          return res.status(400).json("Wrong credentials!");
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
      } catch (err) {
        res.status(500).json(err);
      }
};