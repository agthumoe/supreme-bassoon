/*
  Warnings:

  - A unique constraint covering the columns `[mail_uuid]` on the table `mails` will be added. If there are existing duplicate values, this will fail.
  - The required column `mail_uuid` was added to the `mails` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "mails" ADD COLUMN     "mail_uuid" UUID NOT NULL,
ADD COLUMN     "retried_count" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "mails_mail_uuid_key" ON "mails"("mail_uuid");
