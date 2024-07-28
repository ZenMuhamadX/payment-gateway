import Joi from 'joi'

export const requestClient = Joi.object({
	id_produk: Joi.string().required(),
	username: Joi.string().required(),
	email: Joi.string().email().required(),
})
