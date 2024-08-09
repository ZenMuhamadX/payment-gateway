import { Context } from 'hono'
import crypto from 'crypto'

interface requestClient {
	id_produk: string
	username: string
	email: string
	signature: string
}

const checkSign = async (c: Context) => {
	const clientData: requestClient = await c.req.json()
	const signatureFrontEnd = clientData.signature
	const isValidSign = crypto
		.createHash('sha256')
		.update(clientData.id_produk + clientData.username + clientData.email)
		.digest('hex')
	console.log(clientData)
	console.log(isValidSign)
}
