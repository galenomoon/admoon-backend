import YAML from "yamljs";
import express from "express";
import basicAuth from "basic-auth";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = YAML.load("./src/config/swagger.yaml");

const docs = express();

// docs.use((req, res, next) => {
//   const credentials = basicAuth(req);

//   if (
//     !credentials ||
//     credentials.name !== process.env.SWAGGER_USERNAME ||
//     credentials.pass !== process.env.SWAGGER_PASSWORD
//   ) {
//     res.set("WWW-Authenticate", "Basic realm=Authorization Required");
//     return res.sendStatus(401);
//   }
//   next();
// });

docs.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default docs;
