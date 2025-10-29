import { PrismaClient, RegionCodeEnum, UserType } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

export async function seedUsers() {
  console.log('👥 Seeding users...')
  
  const users: any[] = []
  const regions = Object.values(RegionCodeEnum)
  
  // Create admin user
  const adminPhone = '+989123456789'
  users.push(await prisma.user.upsert({
    where: { phone: adminPhone },
    update: {},
    create: {
      name: 'مدیر سیستم',
      phone: adminPhone,
      email: 'admin@nikrad.com',
      type: UserType.LEGAL,
      firstName: 'مدیر',
      lastName: 'سیستم',
      bio: 'مدیر کل سیستم نیک راد',
      experience: 'بیش از ۱۰ سال تجربه در صنعت ساختمان',
      gallery: [],
      provinceCode: RegionCodeEnum.IR_ESF,
      nationalCode: '0123456789',
    },
  }))

  // Create test users with specific data
  const testUsers = [
    {
      phone: '+989121111111',
      email: 'john.doe@example.com',
      type: UserType.REAL,
      firstName: 'جان',
      lastName: 'دو',
    },
    {
      phone: '+989122222222',
      email: 'jane.smith@example.com',
      type: UserType.REAL,
      firstName: 'جین',
      lastName: 'اسمیت',
    },
    {
      phone: '+989123333333',
      email: 'ali.rezaei@example.com',
      type: UserType.LEGAL,
      firstName: 'علی',
      lastName: 'رضایی',
    },
    {
      phone: '+989124444444',
      email: 'sara.mohammadi@example.com',
      type: UserType.REAL,
      firstName: 'سارا',
      lastName: 'محمدی',
    },
    {
      phone: '+989125555555',
      email: 'reza.ahmadi@example.com',
      type: UserType.LEGAL,
      firstName: 'رضا',
      lastName: 'احمدی',
    },
  ]

  for (const testUser of testUsers) {
    const province = faker.helpers.arrayElement(regions)
    const userType = testUser.type
    
    try {
      users.push(await prisma.user.upsert({
        where: { phone: testUser.phone },
        update: {},
        create: {
          name: `${testUser.firstName} ${testUser.lastName}`,
          phone: testUser.phone,
          email: testUser.email,
          type: userType,
          firstName: testUser.firstName,
          lastName: testUser.lastName,
          bio: faker.lorem.paragraph(),
          experience: faker.lorem.sentence(),
          gallery: [faker.image.url(), faker.image.url()],
          provinceCode: province,
          nationalCode: userType === UserType.REAL ? faker.string.numeric(10) : null,
          nationalCard: userType === UserType.REAL ? { front: faker.image.url(), back: faker.image.url() } : undefined,
          businessLicense: userType === UserType.LEGAL ? { url: faker.image.url() } : undefined,
          companyStatute: userType === UserType.LEGAL ? { url: faker.image.url() } : undefined,
          brandCertificate: userType === UserType.LEGAL ? { url: faker.image.url() } : undefined,
        },
      }))
    } catch (error) {
      console.log(`Skipped duplicate phone: ${testUser.phone}`)
    }
  }

  // Create random users
  for (let i = 0; i < 10; i++) {
    const phone = `+9891${faker.string.numeric(8)}`
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const userType = faker.helpers.enumValue(UserType)
    const province = faker.helpers.arrayElement(regions)
    
    try {
      users.push(await prisma.user.upsert({
        where: { phone },
        update: {},
        create: {
          name: `${firstName} ${lastName}`,
          phone,
          email: faker.internet.email().toLowerCase(),
          type: userType,
          firstName,
          lastName,
          bio: faker.lorem.paragraph(),
          experience: faker.lorem.sentence(),
          gallery: [faker.image.url()],
          provinceCode: province,
          nationalCode: userType === UserType.REAL ? faker.string.numeric(10) : null,
          nationalCard: userType === UserType.REAL ? { front: faker.image.url(), back: faker.image.url() } : undefined,
          businessLicense: userType === UserType.LEGAL ? { url: faker.image.url() } : undefined,
        },
      }))
    } catch (error) {
      console.log(`Skipped duplicate user`)
    }
  }

  console.log(`✅ ${users.length} users seeded!`)
  return users
}

