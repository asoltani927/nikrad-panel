import { PrismaClient, RegionCodeEnum } from '@prisma/client'

const prisma = new PrismaClient()

const iranRegions = [
  { code: 'IR_AR', name: 'آذربایجان شرقی' },
  { code: 'IR_AZ', name: 'آذربایجان غربی' },
  { code: 'IR_ARB', name: 'اردبیل' },
  { code: 'IR_ESF', name: 'اصفهان' },
  { code: 'IR_ALB', name: 'البرز' },
  { code: 'IR_BUS', name: 'بوشهر' },
  { code: 'IR_CHB', name: 'چهارمحال و بختیاری' },
  { code: 'IR_KHJ', name: 'خراسان جنوبی' },
  { code: 'IR_KHR', name: 'خراسان رضوی' },
  { code: 'IR_KHN', name: 'خراسان شمالی' },
  { code: 'IR_KHZ', name: 'خوزستان' },
  { code: 'IR_ZNJ', name: 'زنجان' },
  { code: 'IR_SMN', name: 'سمنان' },
  { code: 'IR_SBL', name: 'سیستان و بلوچستان' },
  { code: 'IR_FRS', name: 'فارس' },
  { code: 'IR_QZV', name: 'قزوین' },
  { code: 'IR_QOM', name: 'قم' },
  { code: 'IR_KRD', name: 'کردستان' },
  { code: 'IR_KRM', name: 'کرمان' },
  { code: 'IR_KSH', name: 'کرمانشاه' },
  { code: 'IR_KYB', name: 'کهگیلویه و بویراحمد' },
  { code: 'IR_GLN', name: 'گلستان' },
  { code: 'IR_GLN2', name: 'گیلان' },
  { code: 'IR_LRS', name: 'لرستان' },
  { code: 'IR_MZN', name: 'مازندران' },
  { code: 'IR_MRK', name: 'مرکزی' },
  { code: 'IR_HRM', name: 'هرمزگان' },
  { code: 'IR_HMD', name: 'همدان' },
  { code: 'IR_YZD', name: 'یزد' },
]

export async function seedCountriesAndRegions() {
  console.log('🌍 Seeding countries and regions...')
  
  // Create Iran country
  const iran = await prisma.country.upsert({
    where: { code: 'IR' },
    update: {},
    create: {
      code: 'IR',
      name: 'ایران',
    },
  })

  // Insert all regions
  for (const region of iranRegions) {
    await prisma.region.upsert({
      where: { code: region.code as RegionCodeEnum },
      update: {},
      create: {
        code: region.code as RegionCodeEnum,
        name: region.name,
        countryCode: iran.code,
      },
    })
  }

  console.log('✅ Countries and regions seeded!')
  return iran
}

