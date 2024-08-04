import axios from 'axios'

interface data {
	orderID: string
	idProduk: string
	username: string
	email: string
	GROSS_AMOUNT: number
	ITEM_PRICE: number
	ITEM_QUANTITY: number
	BRAND: string
	ITEM_NAME: string
	MERCHANT_NAME: string
}

export const sendTxData = (Tx: data) => {
	const {
		orderID,
		idProduk,
		username,
		email,
		GROSS_AMOUNT,
		ITEM_PRICE,
		ITEM_QUANTITY,
		BRAND,
		ITEM_NAME,
		MERCHANT_NAME,
	} = Tx

	try {
		const data = {
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
		const response = sendTxToChain(data)
		return {
			data,
			response,
			status: 'Success added to chains',
		}
	} catch (error) {
		console.error(error);
		throw error
	}
}

const sendTxToChain = async (dataToChain: object) => {
	try {
		const hit = await axios('http://localhost:3000/block', {
			method: 'POST',
			data: {
				dataToChain,
			},
		})
		const response = await hit.data
		return response
	} catch (error) {
		console.error('Error:', error)
		throw error
	}
}
