import { Context, Hono } from 'hono'
const route = new Hono()

// Endpoint untuk menangani webhook dari Midtrans
route.post('/', async (c: Context) => {
	// Ambil payload dari request body
	const payload = await c.req.json()

	// Proses payload sesuai kebutuhan
	console.log('Received webhook payload:', payload)

	// Berikan respons OK
	return c.json({ message: 'Webhook received' }, 200)
})

export default route
