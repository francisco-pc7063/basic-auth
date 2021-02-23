import { Logger } from "tslog"
const log = new Logger({ name: "MainLogger" })

log.info("Starting Enviroment Variables...")
require('dotenv').config()
const port = process.env.PORT || "3001"
log.info("Finished Enviroment Variables\n")




log.info("Starting Imports...")

//Middlewares Import
import express from "express"
//import cors from "cors"
//import helmet from "helmet"
import morgan from "morgan"
import HttpErrorMiddleware from './middleware/httpError'
const httpErrorMiddleware = new HttpErrorMiddleware()

//Routers Import
log.info("Importing Root Router")
import defaultRouter from './routes/default_router'
log.info("Importing Auth Router")
import authRouter from './routes/auth/authRouter'

log.info("Finished Imports\n")





log.info("Starting Middlewares...")
const app = express()

//app.use(helmet())
app.use(morgan('tiny'))
//app.use(cors())
app.use(express.json())
app.use(httpErrorMiddleware.defaultError)
app.use(defaultRouter)
app.use('/auth', authRouter)




app.use('*', httpErrorMiddleware.error404)

log.info("Finished Middlewares...\n")







app.listen(port, () => {
    log.info("Server started on PORT:", port, "\n\n\n\n\n")
})