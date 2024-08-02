import { serve } from '@hono/node-server'
import app from './app'
// Running Server
serve(app, () => {
	console.log('running http://localhost:2500')
})
