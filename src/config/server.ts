import 'express-async-errors'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import routes from '../routes'
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require('./swagger.json');
import { errorHandler } from '../middlewares/errorHandler'

const server = express()

server.use(cors())
server.use(express.json({ limit: '20mb' }))

server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.use(routes)
server.use(errorHandler)

export default server