/*
  Warnings:

  - You are about to drop the `OrderStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_status_fkey`;

-- DropTable
DROP TABLE `OrderStatus`;
