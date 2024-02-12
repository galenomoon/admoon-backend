import 'express-async-errors'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import routes from '../routes'
import bodyParser from 'body-parser'
import swaggerUi from "swagger-ui-express";
import { errorHandler } from '../middlewares/errorHandler'

const server = express()
const swaggerDocument = require('./swagger.json');
const options = { 
  customCss: `https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css`,
  customSiteTitle: "Admoon API Docs - Swagger"
}

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.use(cors())
server.use(express.json({ limit: '20mb' }))


server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options ));

server.use(routes)
server.use(errorHandler)

export default server