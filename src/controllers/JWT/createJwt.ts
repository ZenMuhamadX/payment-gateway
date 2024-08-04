// Fungsi membuat Jsonwebtoken

// Module
import { Context } from 'hono'
import { response } from '../../config/response'
import { validPayloadJwt } from '../../interface/validateInf'
import { signJwt } from '../../lib/JWT/signJwt.lib'
//

// Interface Payload
interface JwtPayload {
	username: string
	server: string
}
//

// Fungsi membuat Jwt
export const createJwt = async (c: Context) => {
	// Validasi
	try {
		// Validasi request Body
		let payload: JwtPayload
		try {
			payload = (await c.req.json()) as JwtPayload
		} catch (parseError) {
			console.error('Failed to parse JSON:', parseError)
			return response(c, 'Invalid JSON', 400, 'Bad Request', null)
		}
		//

		// Validasi Tahap 2
		const { value, error } = validPayloadJwt.validate(payload)
		if (error) {
			return response(c, error.message, 422, 'Unprocessable Entity', null)
		}
		//

		// Membuat Jsonwebtoken
		const token = signJwt(value.username, value.server)
		//

		// Response Jika berhasil
		return response(c, null, 201, 'Token created', { token })
		//

		// Penanganan Error
	} catch (error) {
		console.error('Internal Server Error:', error)
		return response(
			c,
			'Internal Server Error',
			500,
			'Internal Server Error',
			null
		)
	}
	//
}
