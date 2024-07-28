import { Hono } from 'hono'
import { createPayment } from '../controllers/midtransSnap'
import { verifyJwt } from '../middleware/verifyJwt'
const route = new Hono()

route.post('/', verifyJwt, createPayment)

export default route
