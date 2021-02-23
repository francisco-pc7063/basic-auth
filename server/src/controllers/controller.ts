import { Request, Response } from 'express'

class Controller {
    async root(req: Request, res: Response){
        return res.send("Hello World")
    }
}



export default Controller