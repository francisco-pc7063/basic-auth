import Joi from 'joi'
import RegexDatabase, { passwordRegExp, bcryptRegExp } from '../utils/regex/regexDatabase'
//MAX PASSWORD LEGTH (ASCII) for BCRYPT (72 bytes)
export const passMax = 72
export const passMin = 6
export const emailMax = 320

const userContract = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(passMin).max(passMax),
    password: Joi.string().pattern(passwordRegExp),
    repeatPassword: Joi.ref('password'),
    encryptedPassword: Joi.string().pattern(bcryptRegExp).min(60).max(60),
    email: Joi.string().email().max(emailMax)
})
.with('password', 'repeatPassword')


export default userContract