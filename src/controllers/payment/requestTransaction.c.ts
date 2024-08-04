// Request Transaksi

// Module
// import { db } from '../config/db'
import { transactionDetails } from '../../interface/validateInf'
import { TransactionData } from '../../interface/inf'
import { snap } from '../../lib/payment/snap.lib'
import { generateUniqueId } from '../../lib/id/generateId.lib'
import { StatusCode } from 'hono/utils/http-status'
import { midtransError } from '../../interface/inf'
import { toStatusCode } from '../../lib/payment/convertToStatusCode'
//

// Konstanta untuk nilai tetap yang akan diambil dari database
const GROSS_AMOUNT = 70000
const ITEM_PRICE = 70000
const ITEM_QUANTITY = 1
const BRAND = 'x'
const ITEM_NAME = 'Midtrans Bear'
const MERCHANT_NAME = 'Midtrans'
//

interface ResponseTransaction {
	orderID?: string
	token?: string
	redirect_url?: string
	error?: string
	statusCode?: StatusCode
}

// Fungsi request transaksi
export const sendRequestTransaction = async (
	idProduk: string,
	username: string,
	email: string
): Promise<ResponseTransaction | null> => {
	const orderID = generateUniqueId()
	try {
		// Mendefinisikan data transaksi (akan diambil dari database)
		const txData: TransactionData = {
			transaction_details: {
				order_id: orderID,
				gross_amount: GROSS_AMOUNT,
			},
			item_details: [
				{
					id: idProduk,
					price: ITEM_PRICE,
					quantity: ITEM_QUANTITY,
					brand: BRAND,
					name: ITEM_NAME,
					merchant_name: MERCHANT_NAME,
				},
			],
			customer_details: {
				first_name: username,
				email: email,
			},
		}

		// Validasi data transaksi
		const { value, error } = transactionDetails.validate(txData)
		if (error) {
			console.error('Transaction validation failed:', error.message)
			return {
				error: `Transaction validation error: ${error.message}`,
				statusCode: 400,
			}
		}

		// Buat transaksi
		const transaction = await snap.createTransaction(value)
		const redirect_url = transaction.redirect_url
		const token = transaction.token
		return { token, redirect_url, orderID, statusCode: 200 }
	} catch (error) {
		if (error instanceof Error) {
			const midtransErr = error as midtransError
			const statusCodeMidtrans: StatusCode = toStatusCode(
				midtransErr.httpStatusCode.toString()
			)
			console.error(
				'Transaction request failed:',
				midtransErr.ApiResponse.status_message
			)
			return {
				error: midtransErr.ApiResponse.status_message,
				statusCode: statusCodeMidtrans,
			}
		} else {
			console.error('Transaction request failed:', error)
			throw error
		}
	}
}
