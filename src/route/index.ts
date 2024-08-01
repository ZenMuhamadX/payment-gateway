// endpoint

import { Hono } from 'hono'
import { response } from '../config/response'
const route = new Hono()

route.get('/', (c) => {
	return response(c, null, 200, 'Hello From Backend', null)
})

export default route
