-- CreateEnum
CREATE TYPE "Species" AS ENUM ('CAT', 'DOG');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateTable
CREATE TABLE "breed" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "species" "Species" NOT NULL,

    CONSTRAINT "breed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "size" (
    "id" SERIAL NOT NULL,
    "name" "Size" NOT NULL,

    CONSTRAINT "size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dog" (
    "id" SERIAL NOT NULL,
    "breedId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "personality" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "dog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cat" (
    "id" SERIAL NOT NULL,
    "breedId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "personality" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "cat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "breed_name_key" ON "breed"("name");

-- CreateIndex
CREATE UNIQUE INDEX "size_name_key" ON "size"("name");

-- AddForeignKey
ALTER TABLE "dog" ADD CONSTRAINT "dog_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "breed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dog" ADD CONSTRAINT "dog_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cat" ADD CONSTRAINT "cat_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "breed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cat" ADD CONSTRAINT "cat_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
