// Running Server
import { serve } from 'bun'
import app from './app'

const start = () => {
	serve(app)
	console.log('Running http://localhost:2500')
}
start()
