import { Context } from 'hono'
import { blue, green, yellow, red, magenta, cyan, gray, white } from 'colorette'

// Pemetaan warna untuk metode HTTP
const methodColors: { [key: string]: (text: string) => string } = {
	GET: green,
	POST: blue,
	PUT: yellow,
	DELETE: red,
	PATCH: magenta,
	OPTIONS: cyan,
	HEAD: gray,
	// Tambahkan metode lain jika diperlukan
}

export async function logger(c: Context, next: () => Promise<void>) {
	const start = Date.now()

	// Menjalankan request berikutnya
	await next()

	const end = Date.now()
	const ms = end - start
	const { method, path } = c.req
	const { status } = c.res
	const userAgent = c.req.header('User-Agent') || 'Unknown'

	// Pilih warna berdasarkan metode HTTP
	const color = methodColors[method] || white

	// Menampilkan log dengan warna
	console.log(
		`${blue('[LOG]')} ${color(method)} ${yellow(path)} ${cyan(
			status
		)} ${magenta(ms + 'ms')} ${gray(new Date().toISOString())} ${red(
			userAgent
		)}`
	)
}
