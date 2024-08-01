// Instansi Midtrans Payment Gateway
import Midtrans from 'midtrans-client'
export const snap = new Midtrans.Snap({
	clientKey: process.env.MIDTRANS_CLIENT_KEY,
	serverKey: process.env.MIDTRANS_SERVER_KEY,
	isProduction: false,
})
