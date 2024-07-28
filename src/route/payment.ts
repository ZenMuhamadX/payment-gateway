import { Hono } from 'hono'
import { createPayment } from '../controllers/midtransSnap'
const route = new Hono()

route.post('/', createPayment)

export default route
