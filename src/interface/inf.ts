import { StatusCode } from 'hono/utils/http-status'

// JWT interface
export interface JwtVerificationResult {
	error: boolean
	isValidJwt?: boolean
	errorMessage: string | null
	data?: object | string
}

// TransactionData
interface TransactionDetails {
	order_id: string
	gross_amount: number
}

interface ItemDetail {
	id: string
	price: number
	quantity: number
	brand: string
	name: string
	merchant_name: string
}

interface CustomerDetails {
	first_name: string
	email: string
}

export interface TransactionData {
	transaction_details: TransactionDetails
	item_details: ItemDetail[]
	customer_details: CustomerDetails
}

// requestClientData
export interface RequestClientData {
	id_produk: string
	username: string
	email: string
}

// Midtrans Response
export interface midtransError extends Error {
	ApiResponse: {
		status_message: string
	}
	httpStatusCode: StatusCode
}
