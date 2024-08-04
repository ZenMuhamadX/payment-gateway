import { Context } from 'hono'
import { snap } from '../lib/snap.lib'
import { response } from '../config/response'

/**
 * Memeriksa status pembayaran berdasarkan order ID.
 *
 * @param {Context} c - Objek context Hono.
 * @returns {Response} - Objek response HTTP.
 */
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
		// Contoh validasi: panjang order ID harus 36 karakter
		return response(c, 'Order ID tidak valid.', 400, 'Bad Request', null)
	}

	try {
		// Mendapatkan status transaksi dari Snap.
		const statusTx = await snap.transaction.status(orderID)
		return response(c, null, 200, 'Success', statusTx)
	} catch (error) {
		console.error(error)
		return response(c, null, 500, 'Internal Server Error', null)
	}
}
