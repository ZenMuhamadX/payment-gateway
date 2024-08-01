// Moudle
import { Context, Next } from 'hono'
import { response } from '../config/response'

// Middleware untuk memeriksa header 'Content-Type'
export const contentTypeHeaders = async (c: Context, next: Next) => {
	// Mengambil nilai dari header 'Content-Type'
	const contentType = c.req.header('Content-Type')

	// Mengecek apakah tipe konten adalah 'application/json'
	if (contentType === 'application/json') {
		// Jika ya, lanjutkan ke middleware atau handler berikutnya
		await next()
	} else {
		// Jika tidak, kirimkan respons dengan kode status 415 (Unsupported Media Type)
		return response(c, null, 415, 'Unsupported Media Type', null)
	}
}
