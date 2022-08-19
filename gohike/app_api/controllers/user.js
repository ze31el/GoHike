const res = require("express/lib/response");
const jwt  = require('jsonwebtoken');
var mongoose = require("mongoose");
const User = mongoose.model('User');

const createUser = (req, res) => {
    User.create({
        fullname : req.body.fullname,
        mobile : req.body.mobile,
        email : req.body.email,
        password : req.body.password
    },
        (err, userdata) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(201)
                    .json(userdata);
            }
        }
    );
};

const getUsers = function (req, res) {
    User.find().exec(function (err, userdata) {
        if (err) {
            res
                .status(404)
                .json(err);
            return;
        }
        res.status(200)
            .json(userdata)
    });
};

const userLogin = function (req, res) {
    console.log('Inside userLogin')
    let userData = req.body
    User.findOne({email: userData.email},(error,user) =>{
        if(error){
            console.log(error)
        }else{
            console.log(user.fullname)
            if(!user){
                res.status(401).send('Invalid Email')
            }else{
                if(user.password !== userData.password){
                res.status(401).send('Invalid Password')
                }else{
                    let payload = { subject: userData._id}
                    let token = jwt.sign(payload,'secretkey',{})
                    res.status(200).send({token,user})
                }
            }
        }
    }
    );
};

module.exports = {
    createUser,
    getUsers,
    userLogin
}