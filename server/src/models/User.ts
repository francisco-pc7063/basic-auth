import knex from '../database/connection'
import BcryptUtils from '../utils/bcriptUtils'
const bcryptUtils = new BcryptUtils
import { Logger } from "tslog"
const log = new Logger({ name: "UserObjLogger" })


interface ComparePasswordAnswer {
    password: string
    encryptedPassword: string
    result: boolean
}


class User{
    public name: string | undefined = undefined
    public id: number | undefined = undefined
    public password: string | undefined = undefined
    public repeatPassword: string | undefined = undefined
    public encryptedPassword: string | undefined = undefined
    public email: string | undefined = undefined


    constructor(userObj: User){
        this.id = userObj.id || undefined
        this.password = userObj.password || undefined
        this.repeatPassword = userObj.repeatPassword || undefined
        this.encryptedPassword = userObj.encryptedPassword || undefined
        this.name = userObj.name || undefined
        this.email = userObj.email || undefined
    }


    //User Password
    async comparePassword(password = this.password, encryptedPassword = this.encryptedPassword): Promise<ComparePasswordAnswer>{
        let result = await bcryptUtils.compare(password, encryptedPassword)

        let resultObject:ComparePasswordAnswer = { password: this.password, encryptedPassword: this.encryptedPassword, result }
        return resultObject
    }
    async encryptPassword(): Promise<string>{
        this.encryptedPassword = await bcryptUtils.hash(this.password)
        return this.encryptedPassword
    }


    //CRUD
    async create(){
        if(this.id != undefined) log.fatal(new Error("User has ID"))

        let checkUser = await this.read('name')
        console.log(checkUser)
        if(checkUser !== undefined){
            log.warn(`User already registered`)
            return undefined
        }

        let data = await knex.raw(`
        INSERT INTO basic-auth.users
        ("name", "encryptedPassword", "email", "timestamp")
        VALUES(?, ?, ?, CURRENT_TIMESTAMP) returning "id";
        `, [this.name, this.encryptedPassword, this.email])
        this.id = Number(data.rows[0].id)

        return this.id
    }

    async read(from: 'name' | 'id' | 'email' = 'name'): Promise<User | undefined>{
        let data: User[]

        if(from = 'name') data = await knex.select('*').from('users').withSchema('basic-auth').where({ name: this[from] })
        else if (from = 'id') data = await knex.select('*').from('users').withSchema('basic-auth').where({ id: this[from] })
        else if (from = 'email') data = await knex.select('*').from('users').withSchema('basic-auth').where({ email: this[from] })
        
        if(data.length === 0){
            return undefined
        }
                
        return <User>(data[0])
    }
    async readSet(from: 'name' | 'id' | 'email' = 'name'): Promise<User | undefined>{
        let user = await this.read(from)

        if(user === undefined) return undefined
        else{
            this.id = user.id
            this.name = user.name
            this.encryptedPassword = user.encryptedPassword
            this.email = user.email
            return user
        }
    }

    async update(){
        
    }

    async delete(){

    }
}



export default User