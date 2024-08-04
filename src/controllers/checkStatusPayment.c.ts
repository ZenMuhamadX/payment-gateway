import { Context } from 'hono'

export const checkStatusPayment = (c: Context) => {
	const { orderID } = c.req.query()
	return c.json(orderID)
}
