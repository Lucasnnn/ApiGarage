-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profiles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cars" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "horse" INTEGER NOT NULL,
    "traction" TEXT NOT NULL,
    "modified" BOOLEAN NOT NULL,
    "sold" BOOLEAN NOT NULL,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CarsToProfiles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_id_key" ON "Profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Cars_id_key" ON "Cars"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_CarsToProfiles_AB_unique" ON "_CarsToProfiles"("A", "B");

-- CreateIndex
CREATE INDEX "_CarsToProfiles_B_index" ON "_CarsToProfiles"("B");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarsToProfiles" ADD CONSTRAINT "_CarsToProfiles_A_fkey" FOREIGN KEY ("A") REFERENCES "Cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarsToProfiles" ADD CONSTRAINT "_CarsToProfiles_B_fkey" FOREIGN KEY ("B") REFERENCES "Profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
