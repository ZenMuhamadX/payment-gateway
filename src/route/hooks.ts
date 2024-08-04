// endpoint

import { Hono } from 'hono'
import { response } from '../config/response'
import { Context } from 'hono'
const route = new Hono()

route.post('/', (c: Context) => {
	const body = c.req.json()
	console.log(body)
	return response(c, null, 200, 'Hooks succes', { body })
})

export default route
