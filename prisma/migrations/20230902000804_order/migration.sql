-- CreateTable
CREATE TABLE `PizzaFlavor` (
    `id` VARCHAR(191) NOT NULL,
    `flavor` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `active` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PizzaTopping` (
    `id` VARCHAR(191) NOT NULL,
    `topping` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `active` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `client_id` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `status` INTEGER NOT NULL,
    `done` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderSpecifications` (
    `id` VARCHAR(191) NOT NULL,
    `order_id` VARCHAR(191) NOT NULL,
    `flavor_id` VARCHAR(191) NOT NULL,
    `topping_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderSpecifications` ADD CONSTRAINT `OrderSpecifications_flavor_id_fkey` FOREIGN KEY (`flavor_id`) REFERENCES `PizzaFlavor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderSpecifications` ADD CONSTRAINT `OrderSpecifications_topping_id_fkey` FOREIGN KEY (`topping_id`) REFERENCES `PizzaTopping`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderSpecifications` ADD CONSTRAINT `OrderSpecifications_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
