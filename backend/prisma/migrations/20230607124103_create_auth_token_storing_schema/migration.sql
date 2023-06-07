-- CreateTable
CREATE TABLE "AuthRefresh" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "AuthRefresh_pkey" PRIMARY KEY ("id")
);
