import {
	MidtransWebhookPayload,
	returnResponseStanard,
} from '../../interface/inf'
import { validateMidtransSignature } from '../verifyHooks/verifyHook'
import { db } from '../db/db'

export const setStatus = async (
	hooksPayload: MidtransWebhookPayload
): Promise<returnResponseStanard | undefined> => {
	const valid = validateMidtransSignature({
		signatureKey: hooksPayload.signature_key,
		orderId: hooksPayload.order_id,
		statusCode: hooksPayload.status_code,
		grossAmount: hooksPayload.gross_amount,
	})
	try {
		const { data, error, statusText } = await db.from('statusPayment').insert({
			id_payment: hooksPayload.transaction_id,
			order_id: hooksPayload.order_id,
			status: hooksPayload.transaction_status,
			price: hooksPayload.gross_amount,
			currency: hooksPayload.currency,
			signature: hooksPayload.signature_key,
			transaction_time: hooksPayload.transaction_time,
			settlement_time: hooksPayload.settlement_time,
			valid: valid,
		})
		return { data, error: error?.message, status: statusText }
	} catch (error) {
		console.error(error)
		return { data: null, error: error as string, status: 'error' }
	}
}
