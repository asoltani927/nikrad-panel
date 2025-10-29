import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedCategories(createdBy: number) {
  console.log('📁 Seeding categories...')
  
  const categories: any[] = []
  
  // Main categories
  const mainCategories = [
    { name: 'مصالح ساختمانی', slug: 'construction-materials' },
    { name: 'سیمان و بتن', slug: 'cement-concrete' },
    { name: 'آهن آلات', slug: 'iron-steel' },
    { name: 'لوله و اتصالات', slug: 'pipes-fittings' },
    { name: 'رنگ و رزین', slug: 'paint-resin' },
    { name: 'کاشی و سرامیک', slug: 'tiles-ceramics' },
    { name: 'چوب و ام دی اف', slug: 'wood-mdf' },
    { name: 'عایق کاری', slug: 'insulation' },
  ]

  for (const cat of mainCategories) {
    categories.push(await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        names: { fa: cat.name, en: cat.slug },
        createdById: createdBy,
      } as any, // Trick TypeScript here: allow raw object
    }))
  }

  // Sub-categories for first main category
  const subCategories = [
    { name: 'سنگ', slug: 'stone' },
    { name: 'آجر', slug: 'brick' },
    { name: 'گچ', slug: 'plaster' },
  ]

  for (const subCat of subCategories) {
    categories.push(await prisma.category.create({
      data: {
        name: subCat.name,
        slug: subCat.slug,
        names: { fa: subCat.name, en: subCat.slug },
        parentId: categories[0].id,
        createdById: createdBy,
      },
    }))
  }

  console.log(`✅ ${categories.length} categories seeded!`)
  return categories
}

