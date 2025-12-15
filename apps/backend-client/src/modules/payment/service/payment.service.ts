import { ZarinpalGateway } from '../gateways/zarinpal.gateway'

export class PaymentService {
  private gateway: ZarinpalGateway

  constructor(sandbox = true) {
    if (sandbox) {
      if (!process.env.ZARINPAL_SANDBOX_MERCHANT_ID)
        throw new Error('ZARINPAL_SANDBOX_MERCHANT_ID not defined')
      this.gateway = new ZarinpalGateway(process.env.ZARINPAL_SANDBOX_MERCHANT_ID, true)
    } else {
      if (!process.env.ZARINPAL_MERCHANT_ID) throw new Error('ZARINPAL_MERCHANT_ID not defined')
      this.gateway = new ZarinpalGateway(process.env.ZARINPAL_MERCHANT_ID, false)
    }
  }

  async startPayment(amount: number, userId: number, orderId?: number) {
    const callbackUrl = `${process.env.FRONTEND_URL}/payments/callback`
    const result = await this.gateway.requestPayment(amount, callbackUrl, orderId?.toString())
    return result.redirectUrl
  }

  async verifyPayment(authority: string, amount: number) {
    return await this.gateway.verifyPayment(authority, amount)
  }
}
