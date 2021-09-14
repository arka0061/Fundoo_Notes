const userModel = require('../models/user.model.js')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

const JWT_SECRET='@1287hbkjasbdque1db19b39u21adnkanjNjn@asdassd24v43b91b'
class userService {
    registerUser = (user, callback) => {
        userModel.registerUser(user, (err, data) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, data);
            }
        });
    };
    loginUser = (loginInfo, callback) => {
        userModel.loginUser(loginInfo, (err, data) => {
            if (data) {
                bcrypt.compare(loginInfo.password, data.password, (error, resolve) => {
                    if (!resolve) {
                        return callback('Invalid Password', null);
                    }
                    else {
                        const token=jwt.sign({
                            id:data._id,
                            username:data.firstName
                        },JWT_SECRET)
                        return callback(null, token);
                    }
                })
            } else {
                return callback('Please check your email id and password');
            }
        });
    }
}
module.exports = new userService();