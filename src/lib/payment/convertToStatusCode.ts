import { StatusCode, UnofficialStatusCode } from 'hono/utils/http-status'

export const toStatusCode = (codeString: string): StatusCode => {
	// Convert the string to a number
	const rawStatusCode = Number(codeString)
	// Check if the number is a valid HTTP status code
	if (rawStatusCode >= 100 && rawStatusCode <= 599) {
		return rawStatusCode as StatusCode
	}
	return rawStatusCode as UnofficialStatusCode
}
