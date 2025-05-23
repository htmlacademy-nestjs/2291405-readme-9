-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "register_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_count" INTEGER NOT NULL,
    "subscriber_count" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
