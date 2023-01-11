/*
  Warnings:

  - You are about to drop the column `updated_at` on the `mails` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `mails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "mails" DROP COLUMN "updated_at",
DROP COLUMN "updated_by";
