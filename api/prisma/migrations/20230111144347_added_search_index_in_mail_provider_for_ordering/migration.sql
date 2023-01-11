-- DropIndex
DROP INDEX "mail_providers_name_idx";

-- AlterTable
ALTER TABLE "mail_providers" ADD COLUMN     "search_index" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "mail_providers_name_search_index_idx" ON "mail_providers"("name", "search_index");
