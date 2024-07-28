import { serve } from 'bun'
import app from './app'

const run = () => {
	serve(app)
	console.log('Running http://localhost:2500')
}
run()
