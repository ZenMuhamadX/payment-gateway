import { Context } from 'hono'
import { response } from '../../config/response'
import { MidtransWebhookPayload } from '../../interface/inf'
import { validateMidtransSignature } from '../../lib/verifyHooks/verifyHook'
import { updateStatus } from '../../lib/history/updateStatus'
// import { sendTxData } from '../../lib/history/sendToChains'

// const serverKey = process.env.MIDTRANS_SERVER_KEY

export const handleWebhook = async (c: Context) => {
	try {
		const payload: MidtransWebhookPayload = await c.req.json()

		const {
			signature_key,
			order_id,
			status_code,
			gross_amount,
			// transaction_status,
			// transaction_time,
		} = payload
		const isSignatureValid = validateMidtransSignature({
			signatureKey: signature_key,
			orderId: order_id,
			statusCode: status_code,
			grossAmount: gross_amount,
		})

		if (!isSignatureValid) {
			console.log('invalid Signature')
			return response(c, null, 400, 'Invalid Signature', null)
		}
		if (payload.fraud_status !== 'accept') {
			console.log('Fraud Status Not Accepted')
			return response(c, null, 400, 'Fraud Status Not Accepted', null)
		}

		switch (payload.transaction_status) {
			case 'capture':
				// Handle capture status if necessary
				updateStatus(payload)
				return response(c, null, 200, 'Transaction Captured', null)

			case 'settlement':
				// Handle settlement status
				// sendTxData({
				// 	serverKey,
				// 	signatureKey: signature_key,
				// 	orderId: order_id,
				// 	transactionId: transaction_status,
				// 	time: transaction_time,
				// 	transactionStatus: transaction_status,
				// 	grossAmount: gross_amount,
				// })
				updateStatus(payload)
				return response(c, null, 200, 'Transaction Success', null)

			case 'pending':
				// Handle pending status
				updateStatus(payload)
				return response(c, null, 200, 'Webhook received and valid', null)

			case 'deny':
				// Handle deny status
				updateStatus(payload)
				return response(c, null, 200, 'Transaction Denied', null)

			case 'cancel':
				// Handle cancel status
				updateStatus(payload)
				return response(c, null, 200, 'Transaction Canceled', null)

			case 'expire':
				// Handle expire status
				updateStatus(payload)

				return response(c, null, 200, 'Transaction Expired', null)

			case 'failure':
				// Handle failure status
				updateStatus(payload)
				return response(c, null, 200, 'Transaction Failed', null)

			case 'refund':
				// Handle refund status
				updateStatus(payload)

				return response(c, null, 200, 'Transaction Refunded', null)

			case 'partial_refund':
				// Handle partial refund status
				updateStatus(payload)
				return response(c, null, 200, 'Transaction Partially Refunded', null)

			default:
				// Handle any unexpected statuses
				return response(c, null, 400, 'Unhandled Transaction Status', null)
		}
	} catch (error) {
		console.error('Error handling webhook:', error)
		return response(c, null, 500, 'Internal Server Error', null)
	}
}
