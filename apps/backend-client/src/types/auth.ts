import { User } from '@nikrad/database'

export interface AuthenticatedPayload {
  id: string
  user?: User
  customer: {
    id: string
    fullName: string
    username: string
    active: boolean
    createdAt: Date
    updatedAt: Date
    telephoneNumbers?: {
      id: string,
      number: string,
      targets: string[]
    }[]
  }
  sellers: {
    id: string
  }[]
}
