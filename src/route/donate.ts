// endpoint

import { Hono } from 'hono'
import { middlewareVerifyJwt } from '../middleware/verifyJwt.mid'
import { contentTypeHeaders } from '../middleware/headers'
import { handleDonate } from '../controllers/payment/handleDonate'
const route = new Hono()

// validasi ketat untuk pembayaran
route.post(
  '/',
  contentTypeHeaders,
  middlewareVerifyJwt,
  handleDonate
)

export default route
