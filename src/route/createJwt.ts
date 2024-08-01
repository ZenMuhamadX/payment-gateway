// endpoint

import { Hono } from 'hono'
import { createJwt } from '../controllers/createJwt'
const route = new Hono({ strict: true })

route.post('/', createJwt)

export default route
