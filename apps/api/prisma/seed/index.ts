import { 
  PrismaClient, 
  RegionCodeEnum, 
  UserType,
  CustomFieldType,
} from '@prisma/client'
import { faker } from '@faker-js/faker'
import { seedUsers } from './users.seed'
import { seedCountriesAndRegions } from './regions.seed'
import { seedCategories } from './categories.seed'
import { seedMaterialBooks } from './material-books.seed'

const prisma = new PrismaClient()

async function seedAddresses(users: any[]) {
  console.log('📍 Seeding addresses...')
  
  const addresses: any[] = []
  const regions = Object.values(RegionCodeEnum)
  
  // Create 1-2 addresses for some users
  for (let i = 1; i < Math.min(8, users.length); i++) {
    const user = users[i]
    const numAddresses = faker.number.int({ min: 1, max: 2 })
    
    for (let j = 0; j < numAddresses; j++) {
      const province = faker.helpers.arrayElement(regions)
      
      try {
        addresses.push(await prisma.address.create({
          data: {
            userId: user.id,
            regionCode: province,
            address: `${faker.location.streetAddress()}, ${faker.location.city()}, کد پستی: ${faker.string.numeric(10)}`,
          },
        }))
      } catch (error) {
        console.log(`Skipped address for user`)
      }
    }
  }
  
  console.log(`✅ ${addresses.length} addresses seeded!`)
  return addresses
}

async function seedCustomFields(categories: any[], users: any[]) {
  console.log('⚙️ Seeding custom fields...')
  
  const customFields: any[] = []
  const user = users[0]
  
  const fieldTemplates = [
    {
      name: 'warranty_duration',
      title: 'مدت گارانتی',
      type: CustomFieldType.SELECT,
      options: { choices: ['1 سال', '2 سال', '3 سال', '5 سال'] },
    },
    {
      name: 'installation_required',
      title: 'نیاز به نصب',
      type: CustomFieldType.CHECKBOX,
      options: null,
    },
    {
      name: 'production_date',
      title: 'تاریخ تولید',
      type: CustomFieldType.DATE,
      options: null,
    },
    {
      name: 'weight_capacity',
      title: 'ظرفیت وزن',
      type: CustomFieldType.NUMBER,
      options: { unit: 'کیلوگرم' },
    },
    {
      name: 'special_notes',
      title: 'توضیحات ویژه',
      type: CustomFieldType.TEXTAREA,
      options: null,
    },
  ]
  
  for (const template of fieldTemplates) {
    const category = faker.helpers.arrayElement(categories)
    
    customFields.push(await prisma.customField.create({
      data: {
        name: template.name,
        title: template.title,
        type: template.type,
        required: faker.datatype.boolean({ probability: 0.3 }),
        options: template.options || undefined,
        order: customFields.length + 1,
        categoryId: category.id,
        createdById: user.id,
      },
    }))
  }
  
  console.log(`✅ ${customFields.length} custom fields seeded!`)
  return customFields
}

async function seedNeeds(categories: any[], users: any[]) {
  console.log('📋 Seeding needs...')
  
  const needs: any[] = []
  const regions = Object.values(RegionCodeEnum)
  
  for (let i = 0; i < 15; i++) {
    const category = faker.helpers.arrayElement(categories)
    const user = faker.helpers.arrayElement(users)
    const province = faker.helpers.arrayElement(regions)
    
    try {
      needs.push(await prisma.need.create({
        data: {
          title: faker.commerce.productName(),
          categoryId: category.id,
          product: faker.number.int({ min: 1, max: 1000 }),
          provinceCode: province,
          city: faker.location.city(),
          priority: faker.number.int({ min: 1, max: 5 }),
          deliveryDate: faker.date.future(),
          createdById: user.id,
        },
      }))
    } catch (error) {
      console.log('Skipped duplicate need')
    }
  }
  
  console.log(`✅ ${needs.length} needs seeded!`)
  return needs
}

async function seedSuggestions(needs: any[], users: any[]) {
  console.log('💡 Seeding suggestions...')
  
  let suggestionCount = 0
  
  for (const need of needs) {
    // Create 1-4 suggestions per need
    const numSuggestions = faker.number.int({ min: 1, max: 4 })
    
    for (let i = 0; i < numSuggestions; i++) {
      const user = faker.helpers.arrayElement(users)
      
      try {
        await prisma.suggestions.create({
          data: {
            NeedId: need.id,
            price: BigInt(faker.number.int({ min: 100000, max: 10000000 })),
            createdById: user.id,
          },
        })
        suggestionCount++
      } catch (error) {
        // Skip on error
      }
    }
  }
  
  console.log(`✅ ${suggestionCount} suggestions seeded!`)
  return suggestionCount
}

// Material books seeding is now in ./material-books.seed.ts

async function main() {
  console.log('🚀 Starting database seed...\n')

  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log('🗑️  Clearing existing data...')
  await prisma.materialBookPackageInfo.deleteMany()
  await prisma.materialBookAttachment.deleteMany()
  await prisma.file.deleteMany()
  await prisma.materialBook.deleteMany()
  await prisma.suggestions.deleteMany()
  await prisma.need.deleteMany()
  await prisma.customFieldValue.deleteMany()
  await prisma.customField.deleteMany()
  await prisma.address.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()
  await prisma.region.deleteMany()
  await prisma.country.deleteMany()
  console.log('✅ Data cleared!\n')

  // Seed in order
  await seedCountriesAndRegions()
  const users = await seedUsers()
  const categories = await seedCategories(users[0].id)
  const addresses = await seedAddresses(users)
  const customFields = await seedCustomFields(categories, users)
  const needs = await seedNeeds(categories, users)
  const suggestionCount = await seedSuggestions(needs, users)
  const materialBooks = await seedMaterialBooks(users)

  console.log('\n🎉 Database seeded successfully!')
  console.log('\n📊 Summary:')
  console.log(`   - Users: ${users.length}`)
  console.log(`   - Categories: ${categories.length}`)
  console.log(`   - Addresses: ${addresses.length}`)
  console.log(`   - Custom Fields: ${customFields.length}`)
  console.log(`   - Needs: ${needs.length}`)
  console.log(`   - Suggestions: ${suggestionCount}`)
  console.log(`   - Material Books: ${materialBooks.length}`)
  console.log('\n👤 Test Users (phone numbers):')
  console.log('   - Admin: +989123456789 (admin@nikrad.com)')
  console.log('   - User 1: +989121111111 (john.doe@example.com)')
  console.log('   - User 2: +989122222222 (jane.smith@example.com)')
  console.log('   - User 3: +989123333333 (ali.rezaei@example.com)')
  console.log('   - User 4: +989124444444 (sara.mohammadi@example.com)')
  console.log('\n💡 Ready to use! Run: npm run dev')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
