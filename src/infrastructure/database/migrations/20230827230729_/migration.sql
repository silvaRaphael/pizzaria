/*
  Warnings:

  - You are about to drop the `JobCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobPlace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `JobCategory`;

-- DropTable
DROP TABLE `JobPlace`;

-- CreateTable
CREATE TABLE `Client` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `state_id` VARCHAR(191) NOT NULL,
    `city_id` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `State`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
