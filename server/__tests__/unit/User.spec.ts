import { bcryptRegExp } from '../../src/utils/regex/regexDatabase'
import User from '../../src/models/User'
import userContract from '../../src/joi/UserContract'

describe('User Model Tests', () => {
    var user = new User(<User>{ name: "MyTestUser", password: "HigherThen8$", repeatPassword: "HigherThen8$", email: "example@email.com", encryptedPassword: "" })
    it('should pass JOI checkings on the <User> BEFORE password encryption', () => {
        let userObjCheck = userContract.validate(user)
        
        expect(userObjCheck.error).toBeUndefined()
    })
    it('should encrypt user password', async () => {
        var userEncryptedPassword = await user.encryptPassword()

        expect(userEncryptedPassword).toBe(user.encryptedPassword)
    })
    it('should pass by matching bcrypt 12 salt REGEX', () => {
        expect(user.encryptedPassword).toMatch(bcryptRegExp)
    })
    it('should pass JOI checkings on the <User> AFTER password encryption', () => {
        let userObjCheck = userContract.validate(user)
        
        expect(userObjCheck.error).toBeUndefined()
    })
})
