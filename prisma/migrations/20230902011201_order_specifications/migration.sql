/*
  Warnings:

  - You are about to drop the `OrderSpecifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `OrderSpecifications` DROP FOREIGN KEY `OrderSpecifications_flavor_id_fkey`;

-- DropForeignKey
ALTER TABLE `OrderSpecifications` DROP FOREIGN KEY `OrderSpecifications_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `OrderSpecifications` DROP FOREIGN KEY `OrderSpecifications_topping_id_fkey`;

-- DropTable
DROP TABLE `OrderSpecifications`;

-- CreateTable
CREATE TABLE `OrderPizzaFlavor` (
    `id` VARCHAR(191) NOT NULL,
    `order_id` VARCHAR(191) NOT NULL,
    `flavor_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderPizzaTopping` (
    `id` VARCHAR(191) NOT NULL,
    `order_id` VARCHAR(191) NOT NULL,
    `topping_id` VARCHAR(191) NOT NULL,
    `pizzaFlavorId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderPizzaFlavor` ADD CONSTRAINT `OrderPizzaFlavor_flavor_id_fkey` FOREIGN KEY (`flavor_id`) REFERENCES `PizzaFlavor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderPizzaFlavor` ADD CONSTRAINT `OrderPizzaFlavor_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderPizzaTopping` ADD CONSTRAINT `OrderPizzaTopping_topping_id_fkey` FOREIGN KEY (`topping_id`) REFERENCES `PizzaTopping`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderPizzaTopping` ADD CONSTRAINT `OrderPizzaTopping_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderPizzaTopping` ADD CONSTRAINT `OrderPizzaTopping_pizzaFlavorId_fkey` FOREIGN KEY (`pizzaFlavorId`) REFERENCES `PizzaFlavor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
