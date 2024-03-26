
import Joi from 'joi';
// import { body } from 'express-validator';

export default  refreshTokenBodyValidation = (body) => {
    const schema = Joi.object({
        refreshToken: Joi.string().required().label('Refresh Token'),
    });
    return schema.validate(body);
};


// const loginBodyValidation = {
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
// };
// const signUpBodyValidation = {
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//     nic: Joi.string().required(),
//     firstName: Joi.string().required(),
//     lastName: Joi.string().required(),
// };
// module.exports = {
    // refreshTokenBodyValidation,
    // loginBodyValidation,
    // signUpBodyValidation,
// };