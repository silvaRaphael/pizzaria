-- DropForeignKey
ALTER TABLE `Client` DROP FOREIGN KEY `Client_city_id_fkey`;

-- DropForeignKey
ALTER TABLE `Client` DROP FOREIGN KEY `Client_state_id_fkey`;

-- AlterTable
ALTER TABLE `Client` MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `state_id` VARCHAR(191) NULL,
    MODIFY `city_id` VARCHAR(191) NULL,
    MODIFY `street_address` VARCHAR(191) NULL,
    MODIFY `street_number` VARCHAR(191) NULL,
    MODIFY `zip_code` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `State`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
