import { Context } from 'hono'
import { snap } from '../lib/snap.lib'
import { response } from '../config/response'

export const checkStatusPayment = async (c: Context) => {
	// Mengambil order ID dari query parameter.
	const { orderID } = c.req.query()

	// Validasi order ID.
	if (!orderID) {
		return response(
			c,
			'Order ID harus disertakan dalam parameter.',
			400,
			'Bad Request',
			null
		)
	}

	if (orderID.length !== 34) {
		return response(c, 'Order ID tidak valid.', 400, 'Bad Request', null)
	}

	try {
		// Mendapatkan status transaksi dari Snap.
		const statusTx = await snap.transaction.status(orderID)
		return response(c, null, 200, 'Success', statusTx)
	} catch (error) {
		if (error instanceof Error) {
			return response(c, error.ApiResponse, 404, 'Bad Request', null)
		}
		console.error(error)
		return response(c, null, 500, 'Internal Server Error', null)
	}
}
