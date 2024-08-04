import { Hono } from 'hono'
const route = new Hono()

// Endpoint untuk menangani webhook dari Midtrans
route.post('/')

export default route
