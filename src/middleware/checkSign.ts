import { Context } from 'hono'
import crypto from 'crypto'

interface requestClient {
	id_produk: string
	username: string
	email: string
	signature: string
}

export const checkSign = async (c: Context) => {
	const clientData: requestClient = await c.req.json()
	const secretKey = process.env.JWT_SECRET_KEY
	const signatureFrontEnd = clientData.signature
	const isValidSign = crypto
		.createHash('sha256')
		.update(clientData.username + clientData.email + secretKey)
		.digest('hex')
	console.log(clientData)
	console.log(isValidSign)
}
