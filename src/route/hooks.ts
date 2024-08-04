import { Context, Hono } from 'hono'
import crypto from 'crypto'
import { response } from '../config/response'
const route = new Hono()

// Konstanta untuk Secret Key Midtrans
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY! // Ganti dengan server key Anda

// Middleware untuk memverifikasi signature dari Midtrans
const verifyMidtransSignature = async (c: Context) => {
	const signatureKey = c.req.header('x-signature-key')
	if (!signatureKey)
		return response(c, 'Signature key is required', 400, 'Bad request', null)
	const body = await c.req.json()

	console.log(signatureKey)

	// Generate signature hash
	const hash = crypto
		.createHmac('sha512', MIDTRANS_SERVER_KEY)
		.update(body)
		.digest('hex')

	return hash === signatureKey
}

// Endpoint untuk menangani webhook dari Midtrans
route.post('/', async (c: Context) => {
	// Verifikasi signature
	if (!verifyMidtransSignature(c)) {
		return c.json({ error: 'Invalid signature' }, 403)
	}

	// Ambil payload dari request body
	const payload = await c.req.json()

	// Proses payload sesuai kebutuhan
	console.log('Received webhook payload:', payload)

	// Berikan respons OK
	return c.json({ message: 'Webhook received' }, 200)
})

export default route
