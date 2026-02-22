import axios from 'axios'

export class ZarinpalGateway {
  constructor(
    private merchantId: string,
    private sandbox = true,
  ) {}

  private get requestUrl() {
    return this.sandbox
      ? process.env.ZARINPAL_SANDBOX_REQUEST_URL!
      : process.env.ZARINPAL_REQUEST_URL!
  }

  private get verifyUrl() {
    return this.sandbox
      ? process.env.ZARINPAL_SANDBOX_VERIFY_URL!
      : process.env.ZARINPAL_VERIFY_URL!
  }

  private get startPayUrl() {
    return this.sandbox
      ? process.env.ZARINPAL_SANDBOX_START_PAY_URL!
      : process.env.ZARINPAL_START_PAY_URL!
  }

  async requestPayment(amount: number, callbackUrl: string, orderId?: string) {
    if (amount <= 0) throw new Error('Amount must be greater than 0')

    const { data } = await axios.post(
      this.requestUrl,
      {
        merchant_id: this.merchantId,
        amount,
        callback_url: callbackUrl,
        description: 'Transaction payment',
        metadata: orderId ? { order_id: orderId } : {},
      },
      { headers: { 'Content-Type': 'application/json' } },
    )

    if (data.errors?.length) {
      throw new Error(data.errors[0].message)
    }

    return {
      authority: data.data.authority,
      redirectUrl: this.startPayUrl + data.data.authority,
    }
  }

  async verifyPayment(authority: string, amount: number) {
    const { data } = await axios.post(
      this.verifyUrl,
      {
        merchant_id: this.merchantId,
        amount,
        authority,
      },
      { headers: { 'Content-Type': 'application/json' } },
    )

    return data.data
  }
}
