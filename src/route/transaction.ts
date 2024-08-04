// endpoint

import { Hono } from 'hono'
import { handleCreatePayment } from '../controllers/payment/transaction.c'
import { middlewareVerifyJwt } from '../middleware/verifyJwt.mid'
import { contentTypeHeaders } from '../middleware/headers'
import { handleCheckStatusPayment } from '../controllers/payment/checkPaymentStatus.c'
const route = new Hono()

// validasi ketat untuk pembayaran
route.post('/', contentTypeHeaders, middlewareVerifyJwt, handleCreatePayment)
route.get('/', handleCheckStatusPayment)

export default route
