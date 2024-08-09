// Fungsi untuk memverifikasi tanda tangan dari Midtrans
import crypto from 'crypto'

interface signaturePayload {
	signatureKey: string
	orderId: string
	statusCode: string
	grossAmount: string
}

export const validateMidtransSignature = (payload: signaturePayload):boolean => {
	const serverKey = process.env.MIDTRANS_SERVER_KEY!
	const { signatureKey, orderId, statusCode, grossAmount } = payload
	const computedSignature = crypto
		.createHash('sha512')
		.update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
		.digest('hex')

	return signatureKey === computedSignature
}
