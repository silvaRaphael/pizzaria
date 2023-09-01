-- AlterTable
ALTER TABLE `Client` ADD COLUMN `token` VARCHAR(191) NULL,
    ADD COLUMN `token_expiration` DATETIME(3) NULL;
