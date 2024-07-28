// Module
import { Context, Hono } from 'hono'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { secureHeaders } from 'hono/secure-headers'
import { Logger } from './middleware/logging'
import { csrf } from 'hono/csrf'

// Routing define
import index from './route'
import createPayment from './route/payment'

// Costum Response
import { response } from './config/response'

// Instance app
const app = new Hono()

// Middleware
app.use('*', cors())
app.use('*', csrf())
app.use('*', Logger)
app.use('*', secureHeaders())
app.use('*', prettyJSON())

// Route
app.route('/', index)
app.route('/v1/payment', createPayment)

// Not Found
app.notFound((c: Context) => {
	return response(c, true, 404, 'Not Found', {})
})

// onError
app.onError((err, c) => {
	console.error(err)
	return response(c, true, 500, 'Internal Server Error', { err })
})

// Export app Port
export default {
	port: 2500,
	fetch: app.fetch,
}
