import { User } from "@nikrad/database";

export function createUserMock(partial: Partial<User>): User {
  return {
    id: Math.floor(Math.random() * 1000000),
    name: 'John Doe',
    phone: '+989123456789',
    email: 'john.doe@example.com',
    type: 'REAL',
    firstName: 'John',
    lastName: 'Doe',
    bio: 'Test user bio',
    experience: 'Test experience',
    gallery: [],
    nationalCode: null,
    nationalCard: null,
    businessLicense: null,
    companyStatute: null,
    brandCertificate: null,
    provinceCode: 'IR_ESF',
    categoryId: null,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    ...partial
  }
}