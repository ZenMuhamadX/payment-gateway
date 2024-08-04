// Pembuatan Pembayaran

// Module
import { Context } from 'hono'
import { response } from '../config/response'
import { requestClient } from '../interface/validateInf'
import { generateUniqueId } from '../lib/generateId.lib'
import { RequestClientData } from '../interface/inf'
import { sendRequestTransaction } from './requestTransaction.c'
import { snap } from '../lib/snap.lib'
//

// Konstanta untuk status kode dan pesan
const STATUS_CODE_BAD_REQUEST = 400
const STATUS_CODE_CREATED = 201
const STATUS_CODE_INTERNAL_SERVER_ERROR = 500
const MSG_INVALID_JSON = 'Invalid JSON'
const MSG_REQUEST_BODY_EMPTY = 'Request body is empty'
const MSG_PAYMENT_CREATED = 'Payment Created'
const MSG_INTERNAL_SERVER_ERROR = 'Internal Server Error'
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
			return response(
				c,
				MSG_INVALID_JSON,
				STATUS_CODE_BAD_REQUEST,
				'Bad Request',
				null
			)
		}
		//

		// Pastikan ada data yang diterima sebelum validasi
		if (!clientData || Object.keys(clientData).length === 0) {
			return response(
				c,
				MSG_REQUEST_BODY_EMPTY,
				STATUS_CODE_BAD_REQUEST,
				'Bad Request',
				null
			)
		}
		//

		// Validasi data dari client
		const { error, value } = requestClient.validate(clientData)
		if (error) {
			console.error('Validation Error:', error.message)
			return response(
				c,
				error.message,
				STATUS_CODE_BAD_REQUEST,
				'Bad Request',
				null
			)
		}
		//

		// Kirim permintaan transaksi
		const urlPayment = await sendRequestTransaction(
			value.id_produk,
			value.username,
			value.email
		)

		const statusTransaction = await snap.transaction.status(urlPayment?.token)
		console.log(statusTransaction)

		// Periksa hasil dari sendRequestTransaction
		if (!urlPayment || !urlPayment.token || !urlPayment.redirect_url) {
			console.error('Payment creation failed: Invalid response')
			return response(
				c,
				'Payment creation failed',
				STATUS_CODE_INTERNAL_SERVER_ERROR,
				'Internal Server Error',
				null
			)
		}

		// Berhasil membuat pembayaran
		return response(c, null, STATUS_CODE_CREATED, MSG_PAYMENT_CREATED, {
			orderID: urlPayment.orderID,
			token: urlPayment.token,
			url_payment: urlPayment.redirect_url,
		})
		//

		// Penanganan Error
	} catch (error) {
		console.error('Internal Server Error:', error)
		return response(
			c,
			MSG_INTERNAL_SERVER_ERROR,
			STATUS_CODE_INTERNAL_SERVER_ERROR,
			'Internal Server Error',
			null
		)
	}
	//
}
