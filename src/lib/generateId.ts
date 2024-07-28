import crypto from 'crypto'
export const generateUniqueId = (): string => {
	const hash = crypto
		.createHash('sha256')
		.update(crypto.randomBytes(32))
		.digest('hex')
	const id = hash.slice(-16)
	return `0x${id}`
}
