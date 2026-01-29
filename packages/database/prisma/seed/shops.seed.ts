import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedShops(users: any[], categories: any[]) {
  console.log("📁 Seeding shops...");

  const shops: any[] = [];
  const category = faker.helpers.arrayElement(categories);
  const user = faker.helpers.arrayElement(users);

  const mainShops = [
    {
      name: "فروشگاه 1",
      about: "لورم ایپملورم ایپسوملورم ایپسوم لورم ایپسوم",
      about_seller: "ایپسوملورم ایپسوملورم",
      working_hours: {
        sun: "شنبه تا 4 شنبه: 8 الی 20",
        mon: "شنبه تا 4 شنبه: 8 الی 20",
        tue: "شنبه تا 4 شنبه: 8 الی 20",
      },
      response_activity: {
        sun: "شنبه تا 4 شنبه: 8 الی 20",
        mon: "شنبه تا 4 شنبه: 8 الی 20",
        tue: "شنبه تا 4 شنبه: 8 الی 20",
      },
      social_media: {
        tel: "@telegram",
        wha: "@whatsapp",
        ins: "@instagram",
      },
      success_deal: 2,
      failed_deal: 1,
      owner_id: 23,
      category_id: 2,
    },
    {
      name: "فروشگاه 2",
      about: "لورم ایپسوملورم اایپسوملورم ایپسوم لورم ایپسوم",
      about_seller: "ایپسوملورم ایپسوملورم",
      working_hours: {
        sun: "شنبه تا 4 شنبه: 8 الی 20",
        mon: "شنبه تا 4 شنبه: 8 الی 20",
        tue: "شنبه تا 4 شنبه: 8 الی 20",
      },
      response_activity: {
        sun: "شنبه تا 4 شنبه: 8 الی 20",
        mon: "شنبه تا 4 شنبه: 8 الی 20",
        tue: "شنبه تا 4 شنبه: 8 الی 20",
      },
      social_media: {
        tel: "@telegram",
        wha: "@whatsapp",
        ins: "@instagram",
      },
      success_deal: 2,
      failed_deal: 1,
      owner_id: 22,
      category_id: 2,
    },
    {
      name: "فروشگاه 3",
      about: "لورم ایپسوملورم ایپسوملورم ایپسوم لورم ایپسوم",
      about_seller: "ایپسوملورم ایپسوملورم",
      working_hours: {
        sun: "شنبه تا 4 شنبه: 8 الی 20",
        mon: "شنبه تا 4 شنبه: 8 الی 20",
        tue: "شنبه تا 4 شنبه: 8 الی 20",
      },
      response_activity: {
        sun: "شنبه تا 4 شنبه: 8 الی 20",
        mon: "شنبه تا 4 شنبه: 8 الی 20",
        tue: "شنبه تا 4 شنبه: 8 الی 20",
      },
      social_media: {
        tel: "@telegram",
        wha: "@whatsapp",
        ins: "@instagram",
      },
      success_deal: 2,
      failed_deal: 1,
      owner_id: 21,
      category_id: 2,
    },
    {
      name: "فروشگاه 4",
      about: "لورم ایپسوملورم اایپسوملورم ایپسوم لورم ایپسوم",
      about_seller: "ایپسوملورم ایپسوملورم",
      working_hours: {
        sun: "شنبه تا 4 شنبه: 8 الی 20",
        mon: "شنبه تا 4 شنبه: 8 الی 20",
        tue: "شنبه تا 4 شنبه: 8 الی 20",
      },
      response_activity: {
        sun: "شنبه تا 4 شنبه: 8 الی 20",
        mon: "شنبه تا 4 شنبه: 8 الی 20",
        tue: "شنبه تا 4 شنبه: 8 الی 20",
      },
      social_media: {
        tel: "@telegram",
        wha: "@whatsapp",
        ins: "@instagram",
      },
      success_deal: 2,
      failed_deal: 1,
      owner_id: 20,
      category_id: 2,
    },
    {
      name: "فروشگاه 5",
      about: "لورم ایپسوملورم اایپسوملورم ایپسوم لورم ایپسوم",
      about_seller: "ایپسوملورم ایپسوملورم",
      working_hours: {
        sun: "شنبه تا 4 شنبه: 8 الی 20",
        mon: "شنبه تا 4 شنبه: 8 الی 20",
        tue: "شنبه تا 4 شنبه: 8 الی 20",
      },
      response_activity: {
        sun: "شنبه تا 4 شنبه: 8 الی 20",
        mon: "شنبه تا 4 شنبه: 8 الی 20",
        tue: "شنبه تا 4 شنبه: 8 الی 20",
      },
      social_media: {
        tel: "@telegram",
        wha: "@whatsapp",
        ins: "@instagram",
      },
      success_deal: 2,
      failed_deal: 1,
      owner_id: 19,
      category_id: 2,
    },
    {
      name: "فروشگاه 6",
      about: "لورم ایپسوملورم اایپسوملورم ایپسوم لورم ایپسوم",
      about_seller: "ایپسوملورم ایپسوملورم",
      working_hours: {
        sun: "شنبه تا 4 شنبه: 8 الی 20",
        mon: "شنبه تا 4 شنبه: 8 الی 20",
        tue: "شنبه تا 4 شنبه: 8 الی 20",
      },
      response_activity: {
        sun: "شنبه تا 4 شنبه: 8 الی 20",
        mon: "شنبه تا 4 شنبه: 8 الی 20",
        tue: "شنبه تا 4 شنبه: 8 الی 20",
      },
      social_media: {
        tel: "@telegram",
        wha: "@whatsapp",
        ins: "@instagram",
      },
      success_deal: 2,
      failed_deal: 1,
      owner_id: 18,
      category_id: 2,
    },
    {
      name: "فروشگاه 7",
      about: "لورم ایپسوملورم ایپسوملورم ایپسوملورم ایپسوم لورم ایپسوم",
      about_seller: "ایپسوملورم ایپسوملورم",
      working_hours: {
        sun: "شنبه تا 4 شنبه: 8 الی 20",
        mon: "شنبه تا 4 شنبه: 8 الی 20",
        tue: "شنبه تا 4 شنبه: 8 الی 20",
      },
      response_activity: {
        sun: "شنبه تا 4 شنبه: 8 الی 20",
        mon: "شنبه تا 4 شنبه: 8 الی 20",
        tue: "شنبه تا 4 شنبه: 8 الی 20",
      },
      social_media: {
        tel: "@telegram",
        wha: "@whatsapp",
        ins: "@instagram",
      },
      success_deal: 2,
      failed_deal: 1,
      owner_id: 17,
      category_id: 2,
    },
  ];

  for (const shop of mainShops) {
    shops.push(
      await prisma.shop.create({
        data: {
          name: shop.name,
          about: shop.about,
          aboutSeller: shop.about_seller,
          workingHours: shop.working_hours,
          responseHours: shop.response_activity,
          socialMedia: shop.social_media,
          successDeals: shop.success_deal,
          failedDeals: shop.failed_deal,
          ownerId: user.id,
          categoryId: category.id,
          //   createdById: createdBy,
        } as any,
      })
    );
  }

  console.log(`✅ ${shops.length} shops seeded!`);
  return shops;``
}

// export async function seedShops(categories: any[], users: any[]) {
//   console.log("📋 Seeding shops...");

//   const shops: any[] = [];

//   for (let i = 0; i < 15; i++) {
//     const category = faker.helpers.arrayElement(categories);
//     const user = faker.helpers.arrayElement(users);
//     // const days_of_Activity = faker.helpers.arrayElement(activity);

//     try {
//       shops.push(
//         await prisma.shop.create({
//           data: {
//             name: faker.company.name(),
//             about: faker.lorem.lines(),
//             aboutSeller: faker.lorem.lines(),
//             // daysOfActivity: days_of_Activity.name,
//             workingHours: {
//               sun: "شنبه تا 4 شنبه: 8 الی 20",
//               mon: "شنبه تا 4 شنبه: 8 الی 20",
//               tue: "شنبه تا 4 شنبه: 8 الی 20",
//             },
//             responseHours: {
//               sun: "شنبه تا 4 شنبه: 8 الی 20",
//               mon: "شنبه تا 4 شنبه: 8 الی 20",
//               tue: "شنبه تا 4 شنبه: 8 الی 20",
//             },
//             socialMedia: {
//               tel: "@telegram",
//               wha: "@whatsapp",
//               ins: "@instagram",
//             },
//             successDeals: faker.number.int({ max: 1, min: 100 }),
//             failedDeals: faker.number.int({ max: 1, min: 100 }),
//             thumbnailImage: faker.image.url(),
//             ownerId: owner.id,
//             categoryId: category.id,
//           },
//         })
//       );
//     } catch (error) {
//       console.log("Skipped duplicate shops");
//     }
//   }

//   console.log(`✅ ${shops.length} shops seeded!`);
//   return shops;
// }
