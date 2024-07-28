import Joi from 'joi'
import jwt from 'jsonwebtoken'
import { token } from 'morgan'
const key: string = process.env.JWT_SECRET_KEY!

const validPayloadJwt = Joi.object({
	username: Joi.string().required(),
	server: Joi.string().required(),
})

export const tokenJwt = (username: string, server: string): string => {
	const { error, value } = validPayloadJwt.validate({ username, server })
	if (error) throw error
	const token = jwt.sign(value, key, {
		algorithm: 'HS256',
	})
	return token
}
