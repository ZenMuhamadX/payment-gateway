// endpoint

import { Hono } from 'hono'
import { handleCreateJwt } from '../controllers/JWT/createJwt'
const route = new Hono({ strict: true })

route.post('/', handleCreateJwt)

export default route
