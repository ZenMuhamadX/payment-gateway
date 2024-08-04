import { Context } from 'hono'
import { response } from '../../config/response'
import { MidtransWebhookPayload } from '../../interface/inf'
import { validateMidtransSignature } from '../../lib/verifyHooks/verifyHook'

export const handleWebhook = async (c: Context) => {
	try {
		const payload: MidtransWebhookPayload = await c.req.json()

		const signatureKey = payload.signature_key
		const isSignatureValid = validateMidtransSignature({
			signatureKey,
			orderId: payload.order_id,
			statusCode: payload.status_code,
			grossAmount: payload.gross_amount,
		})

		if (isSignatureValid) {
			console.log(isSignatureValid);
			return response(c, null, 200, 'Webhook Verified', { signatureKey })
		} else {
			return response(c, null, 400, 'Webhook Not Verified')
		}
	} catch (error) {
		console.error('Error in handleWebhook:', error)
		return response(c, null, 500, 'Internal Server Error', null)
	}
}
