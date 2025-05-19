/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `postCount` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `subscriberCount` on the `users` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "passwordHash",
DROP COLUMN "postCount",
DROP COLUMN "subscriberCount",
ADD COLUMN     "password_hash" TEXT NOT NULL,
ADD COLUMN     "post_count" INTEGER,
ADD COLUMN     "subscriber_count" INTEGER;
