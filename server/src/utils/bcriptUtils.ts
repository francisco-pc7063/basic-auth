import bcrypt from 'bcrypt'
import { Logger } from "tslog"
const log = new Logger({ name: "BcryptLogger" })

class BcryptUtils {
    saltRound: number = 12

    constructor(){

    }

    async hash(password: string): Promise<string>{
        try {
            let encryptedPassword = await bcrypt.hash(password, this.saltRound)
            return encryptedPassword
        } catch {
            log.fatal(new Error("Bcrypt Utils error"))
        }
    }
    async compare(plainTextPass: string, encryptedPass: string): Promise<boolean>{
        try {
            const samePassword = await bcrypt.compare(plainTextPass, encryptedPass)
            return samePassword 
        } catch {
            log.fatal(new Error("Bcrypt Utils error"))
        }
    }
}


export default BcryptUtils