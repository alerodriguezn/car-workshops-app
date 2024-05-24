/*
  Warnings:

  - You are about to drop the column `description` on the `AppointmentDetail` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `AppointmentDetail` table. All the data in the column will be lost.
  - Added the required column `descption` to the `AppointmentDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "status" SET DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "AppointmentDetail" DROP COLUMN "description",
DROP COLUMN "status",
ADD COLUMN     "descption" TEXT NOT NULL;
