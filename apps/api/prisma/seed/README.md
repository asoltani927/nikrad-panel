# Seed Functions - Updated for Current Schema ✅

All seed functions have been completely updated to match your current Prisma schema.

## 🚀 Quick Start

```bash
# 1. Make sure your database is running
# 2. Generate Prisma Client
npx prisma generate

# 3. Run seeds
npm run seed
```

## 📁 File Structure

```
seed/
├── index.ts                  # Main orchestrator
├── users.seed.ts            # User seeding (with full profile)
├── categories.seed.ts       # Category hierarchy
├── regions.seed.ts          # Countries & regions
├── material-books.seed.ts   # Material books & attachments
└── README.md               # This file
```

## 📊 What Gets Seeded

| Model | Count | Details |
|-------|-------|---------|
| **Users** | 16 | Admin + 5 test users + 10 random |
| **Regions** | 29 | All Iranian provinces |
| **Categories** | 11 | 8 main + 3 sub-categories |
| **Addresses** | ~12 | 1-2 per user |
| **Custom Fields** | 5 | Various field types |
| **Needs** | 15 | User needs with location |
| **Suggestions** | ~45 | 1-4 per need |
| **Material Books** | 8 | With package info |
| **Files** | ~40 | For attachments |
| **Attachments** | ~40 | 2-6 per material book |
| **Package Info** | ~6 | 70% of material books |

## 👤 Test Users

| Phone | Email | Type | Province |
|-------|-------|------|----------|
| `+989123456789` | admin@nikrad.com | LEGAL | اصفهان |
| `+989121111111` | john.doe@example.com | REAL | Random |
| `+989122222222` | jane.smith@example.com | REAL | Random |
| `+989123333333` | ali.rezaei@example.com | LEGAL | Random |
| `+989124444444` | sara.mohammadi@example.com | REAL | Random |
| `+989125555555` | reza.ahmadi@example.com | LEGAL | Random |

## 🔧 Schema Alignments Made

### User Model
✅ Uses `phone` as unique identifier  
✅ All profile fields included (firstName, lastName, bio, experience)  
✅ Required fields: type, provinceCode  
✅ Proper REAL vs LEGAL user handling  
✅ Persian names and Iranian phone numbers  

### Address Model
✅ Simplified to: userId, regionCode, address  
✅ Combined address into single field  
✅ Links to regions  

### Need Model
✅ All required fields: title, categoryId, product, provinceCode, city, priority, deliveryDate  
✅ Links to categories and users  

### Suggestions Model
✅ Uses `NeedId` field (capital N)  
✅ Links to needs  

### MaterialBook Model
✅ Uses `ownerId` instead of userId  
✅ Creates File entries first  
✅ MaterialBookAttachment references File via fileId  
✅ Adds MaterialBookPackageInfo (70% chance)  
✅ Persian titles and realistic data  

### File Model
✅ Creates realistic file entries  
✅ Various file types (PDF, images, docs)  
✅ Proper paths and sizes  

## 📝 Seed Order (Dependency Order)

```
1. Countries & Regions
2. Users (with full profiles)
3. Categories
4. Addresses
5. Custom Fields
6. Needs
7. Suggestions
8. Files & Material Books (with attachments & package info)
```

## 🎯 Expected Output

```
🚀 Starting database seed...

🗑️  Clearing existing data...
✅ Data cleared!

🌍 Seeding countries and regions...
✅ Countries and regions seeded!

👥 Seeding users...
✅ 16 users seeded!

📁 Seeding categories...
✅ 11 categories seeded!

📍 Seeding addresses...
✅ 12 addresses seeded!

⚙️ Seeding custom fields...
✅ 5 custom fields seeded!

📋 Seeding needs...
✅ 15 needs seeded!

💡 Seeding suggestions...
✅ 47 suggestions seeded!

📚 Seeding material books...
✅ 8 material books seeded!

🎉 Database seeded successfully!

📊 Summary:
   - Users: 16
   - Categories: 11
   - Addresses: 12
   - Custom Fields: 5
   - Needs: 15
   - Suggestions: 47
   - Material Books: 8

👤 Test Users (phone numbers):
   - Admin: +989123456789 (admin@nikrad.com)
   - User 1: +989121111111 (john.doe@example.com)
   - User 2: +989122222222 (jane.smith@example.com)
   - User 3: +989123333333 (ali.rezaei@example.com)
   - User 4: +989124444444 (sara.mohammadi@example.com)

💡 Ready to use! Run: npm run dev
```

## 🐛 Troubleshooting

### Issue: Module not found errors
**Solution:** Run `npx prisma generate` to regenerate the Prisma client

### Issue: Foreign key constraint errors
**Solution:** The seed order is correct, but make sure your migrations are up to date:
```bash
npx prisma migrate dev
```

### Issue: Duplicate key violations
**Solution:** Seeds clear all data first. If you want to preserve data, comment out the clearing section in `index.ts`

### Issue: "Property X does not exist on type..."
**Solution:** Your Prisma client is out of sync. Run:
```bash
npx prisma generate
```

## 💡 Customization

### Change Number of Items

Edit the numbers in `index.ts` or individual seed files:

```typescript
// index.ts
for (let i = 0; i < 15; i++) { // Change 15 to your desired number
  // ...
}
```

### Add More Test Users

Edit `users.seed.ts`:

```typescript
const testUsers = [
  // Add your users here
  {
    phone: '+989126666666',
    email: 'newuser@example.com',
    type: UserType.REAL,
    firstName: 'نام',
    lastName: 'نام خانوادگی',
  },
]
```

### Disable Data Clearing

Comment out in `index.ts`:

```typescript
// console.log('🗑️  Clearing existing data...')
// await prisma.materialBookPackageInfo.deleteMany()
// ... etc
```

## ✨ Features

- ✅ **Type-safe** - All arrays properly typed
- ✅ **Error handling** - Graceful handling of duplicates
- ✅ **Modular** - Each model in separate file
- ✅ **Realistic data** - Persian content, Iranian formats
- ✅ **Dependencies handled** - Correct seeding order
- ✅ **Schema-aligned** - 100% matches your Prisma schema

## 🎉 Ready to Use!

Your seeds are now fully updated and ready to populate your database with realistic test data!

```bash
npm run seed
```
