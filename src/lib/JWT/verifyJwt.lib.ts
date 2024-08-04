// Fungsi Verifikasi Jsonwebtoken

// Module
import jwt from 'jsonwebtoken'
import { JwtVerificationResult } from '../../interface/inf'

// Mendapatkan kunci rahasia dari environment dan memastikan keberadaannya
const key: string = process.env.JWT_SECRET_KEY || 'default_secret_key'

export const verifyJwt = (token: string): JwtVerificationResult => {
	try {
		// Verifikasi token JWT
		const decoded = jwt.verify(token, key, { complete: true })

		return {
			error: false,
			errorMessage: null,
			isValidJwt: true,
			data: {
				header: decoded.header,
				payload: decoded.payload,
			},
		}
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			// Khusus menangani kesalahan JWT
			return {
				error: true,
				errorMessage: 'Invalid JWT token',
				isValidJwt: false,
			}
		} else if (error instanceof Error) {
			// Menangani kesalahan umum
			return { error: true, errorMessage: error.message, isValidJwt: false }
		} else {
			// Menangani kesalahan tak dikenal
			return { error: true, errorMessage: 'Unknown error', isValidJwt: false }
		}
	}
}
