// Costum Response JSON

// Module
import { Context } from 'hono'
import { StatusCode } from 'hono/utils/http-status'
//

// Interface Payload JSON
interface ResponsePayload {
	requestId?: string
	error?: string
	statusCode: StatusCode
	statusText: string
	response?: object
}
//

// Fungsi Response Yang di kostumisasi
export function response(
	c: Context,
	error: string | null = null,
	status: StatusCode,
	statusText: string,
	data: object | null = null
) {
	// Ambil Request Id
	const reqId = c.get('requestId') || undefined
	//

	// Instansi Payload response JSON
	const payload: ResponsePayload = {
		requestId: reqId,
		error: error || undefined,
		statusCode: status,
		statusText,
		response: data || undefined,
	}
	//

	// Response JSON
	return c.json({ payload }, status)
	//
}
//
