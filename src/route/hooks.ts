import { Hono } from 'hono'
import { handleWebhook } from '../controllers/hooks/hook'
const route = new Hono()

// Endpoint untuk menangani webhook dari Midtrans
route.post('/', handleWebhook)

export default route
