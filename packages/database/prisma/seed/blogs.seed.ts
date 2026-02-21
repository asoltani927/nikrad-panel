import { faker } from "@faker-js/faker";
import { PrismaClient, BlogStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedBlogs(users: any[], categories: any[]) {
  console.log("📝 Seeding blogs...");

  if (!users.length) throw new Error("Users not found");
  if (!categories.length) throw new Error("Categories not found");

  const blogs: any[] = [];

  for (let i = 0; i < 20; i++) {
    const author = faker.helpers.arrayElement(users);
    const createdBy = faker.helpers.arrayElement(users);

    const selectedCategories = faker.helpers.arrayElements(
      categories.filter((c) => !c.deleted),
      {
        min: 1,
        max: Math.min(3, categories.length),
      },
    );

    const title = faker.lorem.sentence({ min: 3, max: 8 });

    const status = faker.helpers.arrayElement([
      BlogStatus.PUBLISHED,
      BlogStatus.PUBLISHED,
      BlogStatus.DRAFT,
      BlogStatus.ARCHIVED,
    ]);

    const isPublished = status === BlogStatus.PUBLISHED;

    const blog = await prisma.blog.create({
      data: {
        cuid: faker.string.uuid(),
        title,
        slug: faker.helpers.slugify(title).toLowerCase(),
        excerpt: faker.lorem.paragraph(),
        content: faker.lorem.paragraphs(5),
        image: faker.image.urlPicsumPhotos(),
        readingTime: faker.number.int({ min: 2, max: 12 }),
        views: faker.number.int({ min: 0, max: 5000 }),

        status: status,

        publishedAt: isPublished ? faker.date.past() : null,

        userId: author.id,
        createdById: createdBy.id,
        updatedById: createdBy.id,
        categories: {
          connect: selectedCategories.map((c) => ({ id: c.id })),
        },
      },
      include: {
        categories: true,
      },
    });

    console.log(
      `Blog created: [${blog.status}] ${blog.title} (${blog.categories.length} cats)`,
    );
    blogs.push(blog);
  }

  console.log(`✅ ${blogs.length} blogs seeded!`);
  return blogs;
}
