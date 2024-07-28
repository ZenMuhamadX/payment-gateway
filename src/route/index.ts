import { Hono } from 'hono'
import { response } from '../config/response'
const route = new Hono()

route.get('/', (c) => {
	return response(c, false, 200, 'Hello From Backend', {})
})

export default route
