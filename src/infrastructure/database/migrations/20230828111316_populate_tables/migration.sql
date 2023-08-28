/*
  Warnings:

  - Added the required column `street_address` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street_number` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Client` ADD COLUMN `reference` VARCHAR(191) NULL,
    ADD COLUMN `street_address` VARCHAR(191) NOT NULL,
    ADD COLUMN `street_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `zip_code` VARCHAR(191) NOT NULL;
