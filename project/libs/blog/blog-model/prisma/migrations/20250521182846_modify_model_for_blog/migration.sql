/*
  Warnings:

  - Changed the type of `post_type` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `post_state` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('VIDEO', 'TEXT', 'QUOTE', 'PHOTO', 'LINK');

-- CreateEnum
CREATE TYPE "PostState" AS ENUM ('PUBLISHED', 'DRAFT');

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "post_type",
ADD COLUMN     "post_type" "PostType" NOT NULL,
DROP COLUMN "post_state",
ADD COLUMN     "post_state" "PostState" NOT NULL;
