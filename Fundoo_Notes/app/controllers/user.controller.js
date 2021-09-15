const userService = require('../service/user.service.js')
const joiValidation = require('../utilities/joiValidation.js')
class Controller {
    register = (req, res) => {
        try {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            };
            const registerValidation = joiValidation.authRegister.validate(user)

            if (registerValidation.error) {
                console.log(registerValidation.error)
                return res.status(400).send({
                  success: false,
                  message: 'Wrong Input Validations',
                  data: registerValidation
                });           
            }

                userService.registerUser(user, (error, data) => {
                    if (error) {
                        return res.status(409).json({
                            success: false,
                            message: 'User already exist',
                        });
                    } else {
                        return res.status(201).json({
                            success: true, 
                            message: "User Registered",
                            data: data,
                        });
                    }
                });
        } catch (error) {
            return res.status(500).json({
                success: false, message: "Error While Registering",
                data: null,
            });
        }
    }
    login = (req, res) => {
        try {
            const loginInfo = {
                email: req.body.email,
                password: req.body.password
            }
            const loginValidation=joiValidation.authLogin.validate(loginInfo)
           
            if (loginValidation.error) {
                return res.status(400).send({
                  success: false,
                  message: 'Wrong Input Validations',
                  data: loginValidation
                });           
            }
            userService.loginUser(loginInfo, (error, data) => {
                if (error) {
                    return res.status(403).json({
                        success: false,
                        message: "Incorrect Email And Password!",
                        error,
                    });
                }                     
                    return res.status(200).json({
                        success: true,
                        message: "User successfully logged In",
                        data,
                    });              
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: 'Internal server error',
                data,
            });
        }
    }
    
}
module.exports = new Controller();