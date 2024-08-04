import axios from 'axios'

export const sendTxData = (Tx: object) => {
	try {
		const data = {
			data: {
				...Tx,
			},
		}
		const response = sendTxToChain({ data })
		return {
			data,
			response,
			status: 'Success added to chains',
		}
	} catch (error) {
		console.error(error)
		throw error
	}
}

const sendTxToChain = async (dataToChain: object) => {
	try {
		const hit = await axios('http://localhost:3000/block', {
			method: 'POST',
			data: JSON.stringify(dataToChain),
		})
		const response = await hit.data
		return response
	} catch (error) {
		console.error('Error:', error)
		throw error
	}
}
