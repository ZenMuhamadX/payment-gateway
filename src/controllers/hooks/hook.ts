import { Context } from 'hono'
import { response } from '../../config/response'

export const webHook = async (c: Context) => {
	const body = await c.req.json()
	return response(c, null, 200, 'Hooks recived', { hooks: body })
}
