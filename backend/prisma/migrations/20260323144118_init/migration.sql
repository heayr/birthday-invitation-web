-- CreateTable
CREATE TABLE "rsvps" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "attending" BOOLEAN NOT NULL,
    "plusOne" INTEGER NOT NULL DEFAULT 0,
    "alcohol" TEXT,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "rsvps_code_key" ON "rsvps"("code");
