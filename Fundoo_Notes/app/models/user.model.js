const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
},
    {
        timestamps: true
    })

const user = mongoose.model('user', userSchema);

class userModel {

    registerUser = async(userDetails,callback) => {
        const newUser = new user({
            firstName:userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            password:userDetails.password,
        });
       const data= await user.findOne({ firstName: userDetails.firstName });
        if (data) {
           callback('User already exist',data)
            }
         else {
                 const result= await newUser.save();
               callback(null,result);
        }
    }
    loginUser = (loginData, callBack) => {
        user.findOne({ email: loginData.email }, (error, data) => {
            if (error) {
                return callBack(error, null);
            } else if (!data) {
                return callBack("Invalid Credentials", null);
            } else
                return callBack(null, data);
        });
    }
}
module.exports = new userModel();