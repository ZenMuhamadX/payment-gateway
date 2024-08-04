// Pembuatan Pembayaran

// Module
import { Context } from 'hono'
import { response } from '../../config/response'
import { requestClient } from '../../interface/validateInf'
import { RequestClientData } from '../../interface/inf'
import { sendRequestTransaction } from './requestTransaction.c'
//

// Buat pembayaran
export const createPayment = async (c: Context) => {
	try {
		// Menangani parsing JSON dengan hati-hati
		let clientData: RequestClientData
		try {
			clientData = (await c.req.json()) as RequestClientData
		} catch (parseError) {
			console.error(parseError)
			return response(c, 'Invalid Body JSON', 400, 'Bad Request', null)
		}
		//

		// Pastikan ada data yang diterima sebelum validasi
		if (!clientData || Object.keys(clientData).length === 0) {
			return response(c, 'Body is empty', 400, 'Bad Request', null)
		}
		//

		// Validasi data dari client
		const { error, value } = requestClient.validate(clientData)
		if (error) {
			console.error('Validation Error:', error.message)
			return response(c, error.message, 400, 'Bad Request', null)
		}
		//

		// Kirim permintaan transaksi
		const urlPayment = await sendRequestTransaction(
			value.id_produk,
			value.username,
			value.email
		)

		// Periksa hasil dari sendRequestTransaction
		if (urlPayment?.error) {
			console.error(
				'Payment creation failed: Invalid response',
				urlPayment.error
			)
			return response(c, urlPayment.error, 400, 'Bad request', null)
		}

		// Berhasil membuat pembayaran
		return response(c, null, 200, 'Payment Created', {
			orderID: urlPayment?.orderID,
			token: urlPayment?.token,
			url_payment: urlPayment?.redirect_url,
		})
		//

		// Penanganan Error
	} catch (error) {
		if (error instanceof Error) {
			return response(c, error.message, 500, 'Internal Server Error', null)
		}
		console.error('Internal Server Error:', error)
		return response(c, null, 500, 'Internal Server Error', null)
	}
	//
}
