import {
	MidtransWebhookPayload,
	returnResponseStanard,
} from '../../interface/inf'
import { db } from '../db/db'
import { validateMidtransSignature } from '../verifyHooks/verifyHook'

export const updateStatus = async (
	hooksPayload: MidtransWebhookPayload
): Promise<returnResponseStanard | undefined> => {
	const valid = validateMidtransSignature({
		signatureKey: hooksPayload.signature_key,
		orderId: hooksPayload.order_id,
		statusCode: hooksPayload.status_code,
		grossAmount: hooksPayload.gross_amount,
	})
	try {
		const { statusText, error } = await db
			.from('statusPayment')
			.update({
				transaction_id: hooksPayload.transaction_id,
				status: hooksPayload.transaction_status,
				price: hooksPayload.gross_amount,
				currency: hooksPayload.currency,
				signature: hooksPayload.signature_key,
				transaction_time: hooksPayload.transaction_time,
				settlement_time: hooksPayload.settlement_time,
				payment_type: hooksPayload.payment_type,
				valid: valid,
			})
			.eq('order_id', hooksPayload.order_id)

		console.log({ error, statusText })

		return {
			status: statusText,
			error: error?.message,
			data: null,
		}
	} catch (error) {
		console.error(error)
		return {
			status: 'error',
			error: error as string,
			data: null,
		}
	}
}
