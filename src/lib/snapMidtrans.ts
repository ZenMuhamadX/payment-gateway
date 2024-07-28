import Midtrans from 'midtrans-client'
export const snap = new Midtrans.Snap({
	clientKey: process.env.CLIENT_KEY,
	serverKey: process.env.SERVER_KEY,
	isProduction: false,
})
