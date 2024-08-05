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

		if (payload.fraud_status !== 'accept') {
			return response(c, null, 400, 'Fraud Status Not Accepted', null)
		}

		switch (payload.transaction_status) {
			case 'capture':
				// Handle capture status if necessary
				console.log("Capture transaction");
				return response(c, null, 200, 'Transaction Captured', null)

			case 'settlement':
			console.log("Settlement transaction");
				// Handle settlement status
				sendTxData({
					serverKey,
					signatureKey: signature_key,
					orderId: order_id,
					transactionId: transaction_status,
					time: transaction_time,
					transactionStatus: transaction_status,
					grossAmount: gross_amount,
				})
				return response(c, null, 200, 'Transaction Success', null)

			case 'pending':
				// Handle pending status
				console.log('Pending transaction')
				return response(c, null, 200, 'Webhook received and valid', null)

			case 'deny':
				console.log('Deny transaction')
				// Handle deny status
				return response(c, null, 200, 'Transaction Denied', null)

			case 'cancel':
				console.log('Cancel transaction')
				// Handle cancel status
				return response(c, null, 200, 'Transaction Canceled', null)

			case 'expire':
				console.log('Expire transaction')
				// Handle expire status
				return response(c, null, 200, 'Transaction Expired', null)

			case 'failure':
				console.log('Failure transaction')
				// Handle failure status
				return response(c, null, 200, 'Transaction Failed', null)

			case 'refund':
				console.log('Refund transaction')
				// Handle refund status
				return response(c, null, 200, 'Transaction Refunded', null)

			case 'partial_refund':
				console.log('Partial refund transaction')
				// Handle partial refund status
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

