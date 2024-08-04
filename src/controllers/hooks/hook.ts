import { Context } from 'hono'
import { response } from '../../config/response'
const serverKey = process.env.MIDTRANS_SERVER_KEY
import crypto from 'crypto-js'

interface hookFromMidtrans {
	transaction_time: string
	transaction_status: string
	transaction_id: string
	status_message: string
	status_code: string
	signature_key: string
	settlement_time: string
	payment_type: string
	order_id: string
	merchant_id: string
	gross_amount: string
	fraud_status: string
	currency: string
}

export const webHook = async (c: Context) => {
	const hookBody: hookFromMidtrans = await c.req.json()
	const signatureHook = hookBody.signature_key
	const verifySignature = crypto.SHA512(
		`${hookBody.order_id}${hookBody.status_code}${hookBody.gross_amount}${serverKey}`
	)
	if (signatureHook === verifySignature.toString()) {
		console.log('Signature verified')
	}
	console.log({ verifySignature })
	console.log({ signatureHook })
	return response(c, null, 200, 'Hooks recived', { hooks: hookBody })
}
