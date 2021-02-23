import express, { Request, Response } from 'express'
var router = express.Router()
import User from '../../models/User'
import { Logger } from "tslog"
const log = new Logger({ name: "AuthLogger" })
import userContract from '../../joi/UserContract'

// PREFIX = /auth
// REFACTOR ERRORS TO RETURN next()

/*
REFERENCE: https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks

Assign unique login URLs to blocks of users so that not all users can access the site from the same URL!!!!!!!!!!!!!!!
Use a CAPTCHA (completely automated public Turing test to tell computers and humans apart) to prevent automated attacks

Here are conditions that could indicate a brute-force attack or other account abuse:

    Many failed logins from the same IP address
    Logins with multiple usernames from the same IP address
    Logins for a single account coming from many different IP addresses
    Excessive usage and bandwidth consumption from a single use
    Failed login attempts from alphabetically sequential usernames or passwords
    Logins with a referring URL of someone’s mail or IRC client
    Referring URLs that contain the username and password in the format <http://user:password@www.example.com/login.htm>
    If protecting an adult Web site, referring URLs of known password-sharing sites
    Logins with suspicious passwords hackers commonly use, such as ownsyou (ownzyou), washere (wazhere), zealots, hacksyou, and the like


Ultimately, the only best defense is to make sure that users follow basic rules for strong passwords: use long unpredictable passwords,
avoid dictionary words, avoid reusing passwords, and change passwords regularly.
*/

router.get('/', (req: Request, res: Response) => {
    return res.json( {  } )
})



router.post('/user', async (req: Request, res: Response) => {
    const { name, password, repeatPassword , email } = req.body


    let user = new User(<User>{ name , password, repeatPassword, email })
    await user.encryptPassword()
    console.log(user)
    let joiResult = userContract.validate(user)

    if(joiResult.error){
        return res.json({ error: true, message: joiResult.error.details[0].message })
    }

    
    let result = await user.create()
    if(result === undefined){
        log.debug("Username already taken")
        return res.status(403).json ( { error: true, message: "Username Taken" } )
    }

    return res.json( { error: false, message: "User Registered" } ) 
})


/*
One simple yet surprisingly effective solution is to design your Website not to use predictable behavior for failed passwords.
For example, most Web sites return an “HTTP 401 error” code with a password failure, although some web sites instead return an
"HTTP 200 SUCCESS” code but direct the user to a page explaining the failed password attempt. This fools some automated systems,
but it is also easy to circumvent.
*/
router.post('/log', async (req: Request, res: Response) => {
    const { name, password } = req.body


    let user = new User(<User>{ name, password })

    let result = await user.readSet('name')
    if(result == undefined){
        return res.status(404).json( { error: true, message: "No such user", user: undefined } )
    }


    let CompareObj = await user.comparePassword()
    if(CompareObj.result){
        return res.status(201).json( { error: false, user: { name: user.name, authenticated: true } } )
    }
    else {
        return res.status(401).json( { error: true, message: "Wrong Password", user: undefined } )
    }
})


export default router