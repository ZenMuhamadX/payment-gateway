import crypto from 'crypto'
import { Context } from 'hono'
import { response } from '../../config/response'
import {
	MidtransSignatureValidationPayload,
	MidtransWebhookPayload,
} from '../../interface/inf'
import { webhookSchema } from '../../interface/validateInf'

export const handleWebhook = async (ctx: Context) => {
	try {
		const payload: MidtransWebhookPayload = await ctx.req.json()

		// Validasi data menggunakan Joi
		const { error } = webhookSchema.validate(payload)
		if (error) {
			return response(ctx, error.message, 400, 'Bad Request', null)
		}

		const signatureKey = payload.signature_key
		const isSignatureValid = validateMidtransSignature({
			signatureKey,
			orderId: payload.order_id,
			statusCode: payload.status_code,
			grossAmount: payload.gross_amount,
		})

		console.log(isSignatureValid)
		return response(ctx, null, 200, 'Webhook Verified', { signatureKey })

		if (isSignatureValid) {
			return response(ctx, null, 200, 'Webhook Verified', { signatureKey })
		} else {
			return response(ctx, null, 400, 'Webhook Not Verified')
		}
	} catch (error) {
		console.error('Error in handleWebhook:', error)
		return response(ctx, null, 500, 'Internal Server Error', null)
	}
}

// Fungsi untuk memverifikasi tanda tangan dari Midtrans

const validateMidtransSignature = (
	payload: MidtransSignatureValidationPayload
) => {
	const serverKey = process.env.MIDTRANS_SERVER_KEY!
	const { signatureKey, orderId, statusCode, grossAmount } = payload
	const computedSignature = crypto
		.createHash('sha512')
		.update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
		.digest('hex')

	return signatureKey === computedSignature
}
