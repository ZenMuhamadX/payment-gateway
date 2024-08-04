import { Context } from 'hono'
import { response } from '../../config/response'

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
	console.log(hookBody)
	return response(c, null, 200, 'Hooks recived', { hooks:hookBody })
}
