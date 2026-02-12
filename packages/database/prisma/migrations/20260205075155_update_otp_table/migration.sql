/*
  Warnings:

  - You are about to drop the column `createdAt` on the `otps` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `otps` table. All the data in the column will be lost.
  - You are about to drop the column `usedAt` on the `otps` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone,type,code,used_at]` on the table `otps` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expires_at` to the `otps` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "otps_expiresAt_idx";

-- DropIndex
DROP INDEX "otps_phone_type_code_usedAt_key";

-- AlterTable
ALTER TABLE "otps" DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
DROP COLUMN "usedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "used_at" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "otps_expires_at_idx" ON "otps"("expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "otps_phone_type_code_used_at_key" ON "otps"("phone", "type", "code", "used_at");
