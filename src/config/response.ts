import { Context } from 'hono'
import { StatusCode } from 'hono/utils/http-status'

export function response(
	c: Context,
	error: boolean,
	status: StatusCode,
	statusText: string,
	data: object | any | null
) {
	const response = {
		error,
		status,
		statusText,
		response: data,
	}
	return c.json(response, status)
}
