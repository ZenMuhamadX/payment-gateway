// Membuat Id transaksi unik
import crypto from 'crypto'

// Fungsi membuat Id
export const generateUniqueId = (): string => {
	const hash = crypto
		.createHash('sha256')
		.update(crypto.randomBytes(64))
		.digest('hex')
	// Mengambil 32 karakter dari hash untuk entropi yang lebih besar
	const id = hash.slice(-32)
	return `0x${id}`
}
