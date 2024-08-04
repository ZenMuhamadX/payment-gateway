// endpoint

import { Hono } from 'hono'
import { createPayment } from '../controllers/transaction.c'
import { middlewareVerifyJwt } from '../middleware/verifyJwt.mid'
import { contentTypeHeaders } from '../middleware/headers'
import { checkStatusPayment } from '../controllers/checkStatusPayment.c'
const route = new Hono()

// validasi ketat untuk pembayaran
route.post('/', contentTypeHeaders, middlewareVerifyJwt, createPayment)
route.get('/',checkStatusPayment)

export default route
