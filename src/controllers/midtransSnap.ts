import { Context } from 'hono'
import { response } from '../config/response'
import { transactionDetails } from '../lib/transactionDetails'
import { snap } from '../lib/snapMidtrans'
import { v4 as uuidv4 } from 'uuid'
import { requestClient } from '../lib/reqClientSide'

const sendRequestTransaction = async (
	id_produk: string,
	username: string,
	email: string
) => {
	try {
		const orderID: string = uuidv4()
		const data = {
			transaction_details: {
				order_id: orderID,
				gross_amount: 70000,
			},
			item_details: [
				{
					id: id_produk,
					price: 70000,
					quantity: 1,
					name: 'Midtrans Bear',
					brand: 'Midtrans',
					merchant_name: 'Midtrans',
				},
			],
			customer_details: {
				first_name: username,
				email: email,
			},
		}
		const { error, value } = transactionDetails.validate(data)
		if (error) {
			console.error(error)
			throw new Error(error.message)
		}
		const transaction = await snap.createTransaction(value)
		return transaction
	} catch (error) {
		console.error(error)
		return null
	}
}

export const createPayment = async (c: Context) => {
	try {
		const clientData = await c.req.json()
		const { error, value } = requestClient.validate(clientData)
		if (error) {
			console.error(error)
			return response(c, true, 400, 'Bad Request', { error: error.message })
		}
		const urlPayment = await sendRequestTransaction(
			value.id_produk,
			value.username,
			value.email
		)
		return response(c, false, 201, 'Payment Created', {
			token: urlPayment.token,
			url_payment: urlPayment.redirect_url,
		})
	} catch (error) {
		console.error(error)
		return response(c, true, 500, 'Internal Server Error', {
			hint: 'chek request body or try again',
		})
	}
}
