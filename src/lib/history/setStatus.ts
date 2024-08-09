import { returnResponseStanard } from '../../interface/inf'
import { db } from '../db/db'

interface payload {
	order_id: string
	price: number
	username: string
	email: string
}

export const setStatus = async (
	payload: payload
): Promise<returnResponseStanard | undefined> => {
	try {
		const { error, statusText } = await db.from('statusPayment').insert({
			username: payload.username,
			email: payload.email,
			order_id: payload.order_id,
			price: payload.price,
			status: 'waiting',
		})
		console.log({ error, statusText });
		return { data:null, error: error?.message, status: statusText }
	} catch (error) {
		console.error(error)
		return { data: null, error: error as string, status: 'error' }
	}
}
