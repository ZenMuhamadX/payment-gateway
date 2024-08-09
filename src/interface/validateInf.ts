// Validasi Data

// Module
import Joi from 'joi'

// Instansi JWT sign
export const validPayloadJwt = Joi.object({
	username: Joi.string().required(),
	server: Joi.string().required(),
})

// Request Client Side
export const requestClient = Joi.object({
	id_produk: Joi.string().required(),
	username: Joi.string().required(),
	email: Joi.string().email().required(),
	signature: Joi.string().required(),
})

// Detail Transaction
export const transactionDetails = Joi.object({
	transaction_details: Joi.object({
		order_id: Joi.string().required(),
		gross_amount: Joi.number().required(),
	}).required(),
	item_details: Joi.array()
		.items(
			Joi.object({
				id: Joi.string().required(),
				quantity: Joi.number().required(),
				price: Joi.number().required(),
				name: Joi.string().required(),
				brand: Joi.string().required(),
				merchant_name: Joi.string().required(),
			})
		)
		.required(),
	customer_details: Joi.object({
		first_name: Joi.string().required(),
		email: Joi.string().email().required(),
	}).required(),
})
