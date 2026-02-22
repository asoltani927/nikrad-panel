export interface AuthenticatedPayload {
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
