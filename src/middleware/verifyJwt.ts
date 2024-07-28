import { Context, Next } from 'hono'
import jwt from 'jsonwebtoken'
import { response } from '../config/response'
const key: string = process.env.JWT_SECRET_KEY!

export const verifyJwt = async (c: Context, next: Next) => {
	try {
		const token: string = c.req.header('Authorization')!
		if (!token) {
			return response(c, true, 401, 'Unauthorized', {
				message: 'No token provided',
			})
		}
		jwt.verify(token, key, { complete: true })
		await next()
	} catch (error) {
		// Safely handle unknown error types
		if (error instanceof Error) {
			console.error(error.message)
			return response(c, true, 401, 'Unauthorized', { error: error.message })
		} else {
			console.error('An unknown error occurred', error)
			return response(c, true, 500, 'Internal server error', {
				error: 'An unknown error occurred',
			})
		}
	}
}
