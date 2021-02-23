import express from 'express'
var router = express.Router()

import Controller from '../controllers/controller'
const controller = new Controller()
import { Logger } from "tslog"
const log = new Logger({ name: "RootRouterLogger" })


router.get("/", controller.root)



export default router