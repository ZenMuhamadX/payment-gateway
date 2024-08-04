import { Context } from 'hono'
import { snap } from '../lib/snap.lib'
import { response } from '../config/response'

export const checkStatusPayment = async (c: Context) => {
	// cek status pembayaran
	const { orderID } = c.req.query()
	if (!orderID) {
		return response(c, 'require orderID in param', 400, 'bad request', null)
	}
	try {
		const statusTx = await snap.transaction.status(orderID)
		return response(c, null, 200, 'success', statusTx)
	} catch (error) {
		console.error(error)
		return response(c, null, 500, 'internal server error', null)
	}
}
