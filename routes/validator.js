const { boolean, string } = require("joi");
const Joi=require("joi");

const registerValidation=(user)=>{
    const schema = Joi.object({
        username:Joi.string().required(),
        email:Joi.string().required().email({minDomainSegments:2}),
        password:Joi.string().min(6).required()
        .max(25)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{6,}$/)
        .error(errors => {
            errors.forEach(err => {
              switch (err.code) {
                case "any.empty":
                  err.message = "Password should not be empty!";
                  break;
                case "string.min":
                  err.message = `Password should have at least ${6} characters!`;
                  break;
                case "string.max":
                  err.message = `Password should have at most ${25} characters!`;
                  break;
                case "string.pattern.base":
                    err.message = `Password should have atleast one small and capital later`;
                  break;
                default:
                    err.message = `Password not valid`;
                  break;
              }
            });
            return errors;
          }),
    })
    return schema.validateAsync(user)
}

const taskcreateValidation=(task)=>{
    const schema = Joi.object({
        title:Joi.string().required().max(50),
        content:Joi.string().max(120).allow('').optional(),
    })
    return schema.validateAsync(task)
}
const taskupdateValidation=(task)=>{
    const schema = Joi.object({
        title:Joi.string().max(50).optional(),
        content:Joi.string().max(120).optional(),  
        activeStatus:Joi.boolean(),
        trash:Joi.boolean(),
        owner:Joi.string(),
        _id:Joi.string(),
        __v:Joi.number()
    })
    return schema.validateAsync(task)
}

const loginValidation=(user)=>{
    const schema = Joi.object({
        email:Joi.string().required().email(),
        password:Joi.string().min(6).required()
        .max(25)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{6,}$/, 
      'password')
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case "any.empty":
              err.message = "Password should not be empty!";
              break;
            case "string.min":
              err.message = `Password should have at least ${6} characters!`;
              break;
            case "string.max":
              err.message = `Password should have at most ${25} characters!`;
              break;
            case "string.pattern.base":
                err.message = `Password should have atleast one small and capital later`;
              break;
            default:
                err.message = `Password not valid`;
              break;
          }
        });
        return errors;
      }),
    })
    return schema.validateAsync(user)
}

module.exports={registerValidation,loginValidation,taskcreateValidation,taskupdateValidation}