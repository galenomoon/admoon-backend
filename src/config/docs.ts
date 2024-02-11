import YAML from 'yamljs';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = YAML.load('./src/config/swagger.yaml');

const docs = express()
docs.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default docs