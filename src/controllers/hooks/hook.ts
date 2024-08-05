import { Context } from 'hono'
import { response } from '../../config/response'
import { MidtransWebhookPayload } from '../../interface/inf'
import { validateMidtransSignature } from '../../lib/verifyHooks/verifyHook'
import { sendTxData } from '../../lib/history/sendToChains'

const serverKey = process.env.MIDTRANS_SERVER_KEY

export const handleWebhook = async (c: Context) => {
	try {
		const payload: MidtransWebhookPayload = await c.req.json()

		const {
			signature_key,
			order_id,
			status_code,
			gross_amount,
			transaction_status,
			transaction_time,
		} = payload
		const isSignatureValid = validateMidtransSignature({
			signatureKey: signature_key,
			orderId: order_id,
			statusCode: status_code,
			grossAmount: gross_amount,
		})

		if (!isSignatureValid) {
			return response(c, null, 400, 'Invalid Signature', null)
		}

		console.log(payload)

		if (payload.transaction_status === 'capture') {
			console.log('Transaction is captured')
			if (payload.fraud_status === 'accept') {
				console.log('Transaction is fraud')
				return response(c, null, 200, 'Webhook recived and valid', null)
			}
			return
			sendTxData({
				serverKey,
				signatureKey: signature_key,
				orderId: order_id,
				transactionId: transaction_status,
				time: transaction_time,
				transactionStatus: transaction_status,
				grossAmount: gross_amount,
			})
		} else if (payload.transaction_status === 'settlement') {
			console.log('Transaction is settled')
		}
		// Kirim respons 200 OK jika tidak ada masalah
		return response(c, null, 200, 'OK', null)
	} catch (error) {
		console.error('Error in handleWebhook:', error)
		return response(c, null, 500, 'Internal Server Error', null)
	}
}
