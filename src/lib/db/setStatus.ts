import { MidtransWebhookPayload } from '../../interface/inf'
import { db } from './db'

export const setStatus = async (hooksPayload: MidtransWebhookPayload) => {
	const { data, error, status, statusText } = await db
		.from('statusPayment')
		.insert({
			id_payment: hooksPayload.transaction_id,
			order_id: hooksPayload.order_id,
			status: hooksPayload.transaction_status,
			price: hooksPayload.gross_amount,
			currency: hooksPayload.currency,
			signature: hooksPayload.signature_key,
			transaction_time: hooksPayload.transaction_time,
			settlement_time: hooksPayload.settlement_time,
		})
	console.log(data)
	console.log(error)
	console.log(status)
	console.log(statusText)
}
