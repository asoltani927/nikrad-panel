export interface AuthenticatedPayload {
  customer: {
    id: string
    fullName: string
    username: string
    active: boolean
    createdAt: Date
    updatedAt: Date
    phone?: string | null
  }
  sellers: {
    id: string
  }[]
}
