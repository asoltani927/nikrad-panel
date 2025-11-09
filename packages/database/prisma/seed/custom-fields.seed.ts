import { PrismaClient, CustomFieldType, CustomFieldTarget } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

export async function seedCustomFields(materialBooks: any[], users: any[], categories: any[] = []) {
  console.log('📝 Seeding custom fields...')

  const customFields: any[] = []
  const customFieldValues: any[] = []

  // Create 5-10 custom field definitions
  const numFields = faker.number.int({ min: 5, max: 10 })
  for (let i = 0; i < numFields; i++) {
    const user = faker.helpers.arrayElement(users)
    const category = faker.helpers.arrayElement([...categories, null])

    // Random type
    const type = faker.helpers.enumValue(CustomFieldType)

    // Optional JSON options (for select/multi-select)
    const options =
      type === 'SELECT' || type === 'MULTI_SELECT'
        ? JSON.stringify(
            Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => faker.commerce.product())
          )
        : null

    try {
      const field = await prisma.customField.create({
        data: {
          name: faker.commerce.productAdjective() + ' Field',
          title: faker.commerce.productName(),
          type,
          required: faker.datatype.boolean(),
          options,
          defaultValue: faker.datatype.boolean() ? faker.lorem.word() : null,
          order: faker.number.int({ min: 0, max: 10 }),
          target: CustomFieldTarget.MATERIAL_BOOK,
          step: faker.number.int({ min: 0, max: 2 }),
          categoryId: category?.id ?? null,
          createdById: user.id,
        },
      })

      customFields.push(field)
    } catch (error) {
      console.log('Skipped custom field')
    }
  }

  // Assign random values to material books
  for (const book of materialBooks) {
    for (const field of customFields) {
      try {
        // Decide if this field should have a value
        if (faker.datatype.boolean()) {
          let value: string | null = null

          switch (field.type) {
            case 'TEXT':
              value = faker.lorem.sentence()
              break
            case 'NUMBER':
              value = faker.number.int({ min: 1, max: 1000 }).toString()
              break
            case 'DATE':
              value = faker.date.past().toISOString()
              break
            case 'BOOLEAN':
              value = faker.datatype.boolean().toString()
              break
            case 'SELECT':
            case 'MULTI_SELECT':
              const opts = field.options ? JSON.parse(field.options) : []
              value = faker.helpers.arrayElement(opts) ?? null
              break
          }

          if (value !== null) {
            const fieldValue = await prisma.customFieldValue.create({
              data: {
                customFieldId: field.id,
                targetId: book.id,
                value,
              },
            })
            customFieldValues.push(fieldValue)
          }
        }
      } catch (error) {
        console.log('Skipped custom field value')
      }
    }
  }

  console.log(`✅ ${customFields.length} custom fields seeded!`)
  console.log(`✅ ${customFieldValues.length} custom field values seeded!`)

  return { customFields, customFieldValues }
}
