import {
	MidtransWebhookPayload,
	returnResponseStanard,
} from '../../interface/inf'
import { db } from '../db/db'

export const updateStatus = async (
	hooksPayload: MidtransWebhookPayload
): Promise<returnResponseStanard | undefined> => {
	try {
		const { statusText, data, error } = await db
			.from('statusPayment')
			.update({
				status: hooksPayload.transaction_status,
				settlement_time: hooksPayload.settlement_time,
			})
			.eq('id_payment', hooksPayload.transaction_id)
			.eq('order_id', hooksPayload.order_id)
		return {
			status: statusText,
			error: error?.message,
			data,
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
