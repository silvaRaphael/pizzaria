/*
  Warnings:

  - Added the required column `ammount` to the `OrderPizza` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrderPizza` ADD COLUMN `ammount` INTEGER NOT NULL;
