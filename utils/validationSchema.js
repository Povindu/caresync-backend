
import Joi from 'joi';



export default  refreshTokenBodyValidation = (body) => {
    const schema = Joi.object({
        refreshToken: Joi.string().required().label('Refresh Token'),
    });
    return schema.validate(body);
};

