/*
  Warnings:

  - You are about to drop the column `token` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `token_expiration` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Client` DROP COLUMN `token`,
    DROP COLUMN `token_expiration`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `token` VARCHAR(191) NULL,
    ADD COLUMN `token_expiration` DATETIME(3) NULL;
