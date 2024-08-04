import jwt from 'jsonwebtoken'
import { validPayloadJwt } from '../../interface/validateInf'

// Mendapatkan kunci rahasia dari environment dan memastikan keberadaannya
const key: string = process.env.JWT_SECRET_KEY || 'Your_secret_key'

// Interface untuk data payload JWT
interface JwtTokenPayload {
	username: string
	server: string
}

// Fungsi untuk menandatangani JWT
export const signJwt = (username: string, server: string): string => {
	// Membuat payload untuk token
	const payload: JwtTokenPayload = { username, server }

	// Validasi payload
	const { error, value } = validPayloadJwt.validate(payload)
	if (error) {
		console.error('Payload validation failed:', error.message)
		throw new Error('Invalid payload for JWT')
	}

	// Menandatangani token dengan algoritma HS256
	try {
		const token = jwt.sign(value, key, {
			algorithm: 'HS256',
			// expiresIn: '1h', // Tambahkan masa berlaku token jika diperlukan
		})
		return token

		// Penanganan Error
	} catch (err) {
		console.error('Error signing JWT:', err)
		throw new Error('Failed to sign JWT')
	}
}
