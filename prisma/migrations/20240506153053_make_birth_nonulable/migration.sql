/*
  Warnings:

  - Made the column `birth` on table `Child` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birth` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Child" ALTER COLUMN "birth" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "birth" SET NOT NULL;
