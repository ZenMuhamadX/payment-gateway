// Middleware verifikasi jsonwebtoken

import { Context, Next } from 'hono'
import { response } from '../config/response'
import { verifyJwt } from '../lib/JWT/verifyJwt.lib'

export const middlewareVerifyJwt = async (c: Context, next: Next) => {
	try {
		const token: string = c.req.header('Authorization')!
		if (!token) {
			return response(c, 'no token provided', 401, 'Unauthorized', null)
		}
		const { isValidJwt, errorMessage } = verifyJwt(token)
		if (!isValidJwt) {
			return response(c, errorMessage, 401, 'Unauthorized', null)
		}
		await next()
	} catch (error) {
		// Safely handle unknown error types
		console.error('An unknown error occurred', error)
		return response(
			c,
			'An unknown error occurred',
			500,
			'Internal server error',
			null
		)
	}
}
