import { Context, Next } from 'hono'
import chalk from 'chalk'

// Fungsi untuk memberi warna pada metode HTTP
const getMethodColor = (method: any) => {
	switch (method) {
		case 'GET':
			return chalk.cyan(method)
		case 'POST':
			return chalk.magenta(method)
		case 'PUT':
			return chalk.yellow(method)
		case 'DELETE':
			return chalk.red(method)
		case 'PATCH':
			return chalk.blue(method)
		default:
			return chalk.white(method)
	}
}

export const Logger = async (c: Context, next: Next) => {
	const start = Date.now()
	await next()
	const ms = Date.now() - start
	const { method, url } = c.req
	const status = c.res.status
	// Tentukan warna berdasarkan status kode
	let statusColor
	if (status >= 200 && status < 300) {
		statusColor = chalk.green(status)
	} else if (status >= 400 && status < 500) {
		statusColor = chalk.red(status)
	} else if (status >= 500) {
		statusColor = chalk.magenta(status)
	} else {
		statusColor = chalk.white(status)
	}

	// Log dengan warna kustom
	console.log(
		`[${new Date().toISOString()}] ${getMethodColor(
			method
		)} ${url} - ${statusColor} - ${ms}ms`
	)
}
