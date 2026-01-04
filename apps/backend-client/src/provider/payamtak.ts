import axios from 'axios'
import { TextingProvider } from '../plugins/texting'

const TextingPatterns = {
  OTP: 'rxe117ri7li0o9z',
}

export function createPayamTakProvider() {
  const apiKey = process.env.PAYAMTAK_API_KEY!
  const sender = process.env.PAYAMTAK_SENDER!

  const client = axios.create({
    baseURL: 'https://edge.ippanel.com/v1',
    timeout: 5000,
  })

  const provider: TextingProvider = {
    async sendText(to, message) {
      try {
        const res = await client.post(
          '/api/send',
          {
            sending_type: 'webservice',

            from_number: sender,
            recipients: [to],
            message,
            send_time: new Date().toISOString(),
          },
          {
            headers: {
              Authorization: apiKey,
            },
          },
        )

        if (!res.data?.meta.status) {
          throw new Error(res.data?.message || 'PayamTak sendText failed')
        }
      } catch (err: any) {
        throw new Error(`PayamTak sendText error: ${err.response?.data || err.message}`)
      }
    },

    async sendPattern(to, patternId, values) {
      try {
        const res = await client.post(
          '/api/send',
          {
            sending_type: 'pattern',
            code: patternId,
            from_number: sender,
            recipients: [to],
            params: values,
          },
          {
            headers: {
              Authorization: apiKey,
            },
          },
        )

        if (!res.data?.meta.status) {
          throw new Error(res.data?.message || 'PayamTak sendPattern failed')
        }
      } catch (err: any) {
        throw new Error(`PayamTak sendPattern error: ${err.response?.data || err.message}`)
      }
    },

    async sendOtp(to, code) {
      return this.sendPattern(to, TextingPatterns.OTP, { code })
    },
  }

  return provider
}
