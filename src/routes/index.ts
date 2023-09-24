import { Router } from 'express'
import userRoutes from './user.routes'
import productsRoutes from './products.routes'
import superUserRoutes from './superUser.routes'
import categoriesRoutes from './categories.routes'
import imagesRoutes from './images.routes'
const routes = Router()

routes.use('/users', userRoutes)
routes.use('/superusers', superUserRoutes)
routes.use('/products', productsRoutes)
routes.use('/categories', categoriesRoutes)
routes.use('/images', imagesRoutes)

routes.get('/', (_, res) => res.status(200).json({ message: 'OK!' }))

export default routes