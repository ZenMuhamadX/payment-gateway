import { StatusCode } from 'hono/utils/http-status'
import { db } from '../../lib/db/db'

interface ResponseDatabase {
	data?: ReturnDataFromDatabase
	error?: string
	statusCode?: StatusCode | number
	statusText?: string
}

interface ReturnDataFromDatabase {
	class_id: string
	title: string
	price: number
	created_at: string
	merchant_name: string
}

export const getDataById = async (
	idProduk: string
): Promise<ResponseDatabase> => {
	const { data, error, status, statusText } = await db
		.from('classProduct')
		.select('*')
		.eq('class_id', idProduk)

	if (error) {
		console.error('Error fetching data:', error.message)
		return {
			error: error.message,
			statusCode: status || 500,
			statusText: statusText || 'Unknown Error',
		}
	}

	if (!data || data.length === 0) {
		return {
			error: 'No data found',
			statusCode: 404,
			statusText: 'Not Found',
		}
	}

	const product: ReturnDataFromDatabase = data[0]
	return {
		data: product,
		statusCode: status || 200,
		statusText: statusText || 'OK',
	}
}
