const userModel = require('../models/user.model.js')
class userService {
    registerUser = (user, callback) => {
        userModel.registerUser(user, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    };
    loginUser = (loginInfo, callback) => {
        userModel.loginUser(loginInfo, (err, data) => {
            if (data) {
                const check=loginInfo.password== data.password
                    if (check==false)
                     {
                        callback('Invalid Password', null);
                    }
                    else
                     {
                        callback(null, data);
                    }                 
                
            } else {
                callback('Please check your email id and password');
            }
        });
    }
}
module.exports = new userService();