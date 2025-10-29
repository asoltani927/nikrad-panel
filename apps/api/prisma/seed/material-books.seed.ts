import { 
  PrismaClient,
  MaterialBookStatus,
  PackageType,
  PaymentStatus
} from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

export async function seedMaterialBooks(users: any[]) {
  console.log('📚 Seeding material books...')
  
  const materialBooks: any[] = []
  
  for (let i = 0; i < 8; i++) {
    const user = faker.helpers.arrayElement(users)
    
    try {
      const materialBook = await prisma.materialBook.create({
        data: {
          ownerId: user.id,
          title: faker.commerce.productName() + ' - دفترچه مصالح',
          status: faker.helpers.enumValue(MaterialBookStatus),
          createdById: user.id,
        },
      })
      
      materialBooks.push(materialBook)
      
      // Add package info (70% chance)
      if (faker.datatype.boolean({ probability: 0.7 })) {
        try {
          await prisma.materialBookPackageInfo.create({
            data: {
              materialBookId: materialBook.id,
              packageType: faker.helpers.enumValue(PackageType),
              amount: BigInt(faker.number.int({ min: 1000000, max: 50000000 })),
              paymentStatus: faker.helpers.enumValue(PaymentStatus),
              invoiceNumber: faker.datatype.boolean() ? faker.string.alphanumeric(10).toUpperCase() : null,
              paidAt: faker.datatype.boolean() ? faker.date.past() : null,
              transactionInfo: faker.datatype.boolean() ? {
                transactionId: faker.string.alphanumeric(16),
                gateway: faker.helpers.arrayElement(['زرین‌پال', 'پی‌پینگ', 'آی‌دی‌پی']),
                cardNumber: faker.string.numeric(16)
              } : undefined,
            },
          })
        } catch (error) {
          console.log('Skipped package info')
        }
      }
      
      // Add 2-6 attachments per material book
      const numAttachments = faker.number.int({ min: 2, max: 6 })
      for (let j = 0; j < numAttachments; j++) {
        try {
          // Create file first
          const file = await prisma.file.create({
            data: {
              name: faker.system.fileName(),
              path: `/uploads/${faker.string.alphanumeric(20)}.${faker.helpers.arrayElement(['pdf', 'jpg', 'png', 'xlsx', 'docx'])}`,
              type: faker.helpers.arrayElement(['application/pdf', 'image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
              size: faker.number.int({ min: 10000, max: 5000000 }),
            },
          })
          
          // Then create attachment referencing the file
          await prisma.materialBookAttachment.create({
            data: {
              materialBookId: materialBook.id,
              fileId: file.id,
              createdById: user.id,
            },
          })
        } catch (error) {
          console.log('Skipped attachment')
        }
      }
    } catch (error) {
      console.log('Skipped material book')
    }
  }
  
  console.log(`✅ ${materialBooks.length} material books seeded!`)
  return materialBooks
}

