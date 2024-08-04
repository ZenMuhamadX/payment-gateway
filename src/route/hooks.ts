import { Hono } from 'hono'
import { webHook } from '../controllers/hooks/hook'
const route = new Hono()

// Endpoint untuk menangani webhook dari Midtrans
route.post('/', webHook)

export default route
