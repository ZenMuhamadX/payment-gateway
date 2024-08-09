import { Context, Next } from 'hono'
import crypto from 'crypto'
import { response } from '../config/response'

interface requestClient {
	id_produk: string
	username: string
	email: string
	signature: string
}

export const checkSign = async (c: Context, next: Next) => {
	const clientData: requestClient = await c.req.json()
	const secretKey = process.env.JWT_SECRET_KEY
	const signatureFrontEnd = clientData.signature
	const validSign = crypto
		.createHash('sha256')
		.update(clientData.username + clientData.email + secretKey)
		.digest('hex')
	if (signatureFrontEnd === validSign) {
		return await next()
	} else {
		return response(c, 'Invalid Signature', 400, 'Bad Request')
	}
}
