import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedShops(users: any[], categories: any[]) {
  console.log("📁 Seeding shops...");

  const shops: any[] = [];

  for (let i = 0; i < 15; i++) {
    const user = faker.helpers.arrayElement(users);
    const category = faker.helpers.arrayElement(categories);

    const shop = await prisma.shop.create({
      data: {
        cuid: faker.string.uuid(),

        name: `فروشگاه ${i + 1}`,
        about: faker.lorem.paragraph(),
        aboutSeller: faker.lorem.paragraph(),

        successDeals: faker.number.int({ min: 0, max: 100 }),
        failedDeals: faker.number.int({ min: 0, max: 50 }),

        thumbnailImage: faker.image.url(),

        daysOfActivity: faker.helpers.arrayElements(
          ["sat", "sun", "mon", "tue", "wed", "thu", "fri"],
          { min: 3, max: 6 },
        ),

        workingHours: {
          from: "08:00",
          to: "20:00",
        },

        responseHours: {
          from: "09:00",
          to: "18:00",
        },

        socialMedia: {
          instagram: faker.internet.username(),
          telegram: faker.internet.username(),
          website: faker.internet.url(),
          whatsapp: faker.phone.number(),
        },

        ownerId: user.id,
        categoryId: category.id,
      },
    });

    shops.push(shop);
  }

  console.log(`✅ ${shops.length} shops seeded!`);
  return shops;
}
