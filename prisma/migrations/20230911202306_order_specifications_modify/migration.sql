/*
  Warnings:

  - You are about to drop the column `order_id` on the `OrderPizzaFlavor` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `OrderPizzaTopping` table. All the data in the column will be lost.
  - Added the required column `order_pizza_id` to the `OrderPizzaFlavor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_pizza_id` to the `OrderPizzaTopping` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `OrderPizzaFlavor` DROP FOREIGN KEY `OrderPizzaFlavor_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `OrderPizzaTopping` DROP FOREIGN KEY `OrderPizzaTopping_order_id_fkey`;

-- AlterTable
ALTER TABLE `OrderPizzaFlavor` DROP COLUMN `order_id`,
    ADD COLUMN `order_pizza_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `OrderPizzaTopping` DROP COLUMN `order_id`,
    ADD COLUMN `order_pizza_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `OrderPizzaFlavor` ADD CONSTRAINT `OrderPizzaFlavor_order_pizza_id_fkey` FOREIGN KEY (`order_pizza_id`) REFERENCES `OrderPizza`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderPizzaTopping` ADD CONSTRAINT `OrderPizzaTopping_order_pizza_id_fkey` FOREIGN KEY (`order_pizza_id`) REFERENCES `OrderPizza`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
