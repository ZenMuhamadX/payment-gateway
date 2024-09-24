import { Context } from 'hono'
import Joi from 'joi'
import { response } from '../../config/response'
import { snap } from '../../lib/payment/snap.lib'
import { generateUniqueId } from '../../lib/id/generateId.lib'

// Mendefinisikan interface untuk input donasi
interface DonationInput {
  amount: number
  name: string
  email: string
}

// Schema validasi menggunakan Joi
const donationSchema = Joi.object<DonationInput>({
  amount: Joi.number().positive().required(),
  name: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
})

// Fungsi untuk membuat transaksi donasi dengan Snap
export const handleDonate = async (c: Context) => {
  const orderId = generateUniqueId()
  try {
    const { amount, email, name } = (await c.req.json()) as DonationInput

    // Validasi input
    const { error } = donationSchema.validate({ amount, name, email })
    if (error) {
      return response(c, error.message, 400, 'Invalid input')
    }

    // Data transaksi untuk Snap Midtrans
    const transactionDetails = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      customer_details: {
        first_name: name,
        email: email,
      },
      item_details: [
        {
          id: 'donation',
          price: amount,
          quantity: 1,
          name: 'Pay Donation',
        },
      ],
    }

    // Buat transaksi Snap
    const transaction = await snap.createTransaction(transactionDetails)

    // Kembalikan Snap Token agar bisa digunakan di front-end
    return response(c, null, 200, 'Payment Created', {
      orderID: transaction?.order_id,
      token: transaction?.token,
      url_payment: transaction?.redirect_url,
    })
  } catch (error) {
    console.error('Midtrans Snap error:', error)
    return response(c, 'Something went wrong or invalid JSON input', 500, 'Internal Server Error')
  }
}
