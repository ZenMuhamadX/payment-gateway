import { StatusCode } from 'hono/utils/http-status'
import { db } from '../../lib/db/db'

interface responseDatabase {
	data?: any
	error?: string
	statusCode?: StatusCode | number
	statusText?: string
}

interface returnDataFromDatabase {
	class_id: string
	title: string
	price: number | string
	created_at: string
	merchant_name: string
}

export const getDataById = async (idProduk: string): Promise<responseDatabase> => {
	const { data, error, status, statusText } = await db
		.from('classProduct')
		.select('*')
		.eq('class_id', `${idProduk}`)

	if (error) {
		console.error('Error fetching data:', error.message)
		return { error: error.message, statusCode: status, statusText: statusText }
	}

	if (!data || data.length === 0) {
		return {
			error: 'No data found',
			statusCode: status,
			statusText: statusText,
		}
	}

	const product: returnDataFromDatabase = data[0]
	return { data: product, statusCode: status, statusText: statusText }
}
