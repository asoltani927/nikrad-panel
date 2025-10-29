import { User } from "@prisma/client";

export function createUserMock(partial: Partial<User>) : User {
  return {
    id: Math.floor(Math.random() * 1000000),
    name: 'John Doe',
    email: 'john.doe@example.com',
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    ...partial
  }
}