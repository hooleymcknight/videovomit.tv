-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NULL,
    `field` VARCHAR(45) NOT NULL,
    `value` LONGTEXT NULL,
    `updated` DATETIME(0) NULL,
    `expiry` DATETIME(0) NULL,

    UNIQUE INDEX `field_UNIQUE`(`field` ASC),
    PRIMARY KEY (`field` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NULL,
    `password` TEXT NULL,
    `fname` VARCHAR(45) NULL,
    `lname` VARCHAR(45) NULL,
    `type` VARCHAR(45) NULL,
    `email` TEXT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vvod` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NULL,
    `platform` VARCHAR(45) NULL,

    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

