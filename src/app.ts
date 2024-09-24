// Module
import { Context, Hono } from 'hono'
import { response } from './config/response'

// Instansi Middleware
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { secureHeaders } from 'hono/secure-headers'
import { csrf } from 'hono/csrf'
import { requestId } from 'hono/request-id'
import { logger } from './middleware/logger.mid'

// routing module
import index from './route'
import createPayment from './route/transaction'
import createJwt from './route/createJwt'
import hooks from './route/hooks'
import donate from './route/donate'

// Instansi app
const app = new Hono()

// Use Middleware
app.use(
	'*',
	cors({
		origin: '*', // Mengizinkan semua asal
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Metode HTTP yang diizinkan
	})
)
app.use(secureHeaders())
app.use(csrf())
app.use(logger)
app.use(requestId())
app.use(prettyJSON())

// Path Route
app.route('/', index)
app.route('/v1/hooks', hooks)
app.route('/v1/token', createJwt)
app.route('/v1/transaction', createPayment)
app.route('/v1/transaction/donate',donate)

// Not Found response
app.notFound((c: Context) => {
	return response(c, null, 404, 'Not Found', null)
})

// onError response
app.onError((err, c) => {
	console.error(err)
	return response(c, 'An unknown error', 500, 'Internal Server Error', { err })
})

// Export app Port
export default {
	port: 2500,
	fetch: app.fetch,
}
