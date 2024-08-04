import { Context } from 'hono'

export const checkStatusPayment = (c: Context) => {
	const orderID = c.req.query('orderID')
	return c.json({ orderID })
}
