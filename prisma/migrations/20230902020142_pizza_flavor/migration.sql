/*
  Warnings:

  - You are about to drop the column `pizzaFlavorId` on the `OrderPizzaTopping` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `OrderPizzaTopping` DROP FOREIGN KEY `OrderPizzaTopping_pizzaFlavorId_fkey`;

-- AlterTable
ALTER TABLE `OrderPizzaTopping` DROP COLUMN `pizzaFlavorId`;
