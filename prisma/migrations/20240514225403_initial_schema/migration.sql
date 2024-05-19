-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mechanic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "workshopId" INTEGER NOT NULL,

    CONSTRAINT "Mechanic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workshop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "speciality" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "Workshop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3),
    "vehicleId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "workshopId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentDetail" (
    "id" SERIAL NOT NULL,
    "appointmentId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppointmentDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentMedia" (
    "id" SERIAL NOT NULL,
    "appointmentDetailId" INTEGER NOT NULL,
    "mediaUrl" TEXT NOT NULL,

    CONSTRAINT "AppointmentMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repairs" (
    "id" SERIAL NOT NULL,
    "appointmentId" INTEGER NOT NULL,
    "managerId" INTEGER NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "repairStatus" TEXT NOT NULL DEFAULT 'Pending',
    "ApprovedByCliente" BOOLEAN NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "Repairs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepairDetails" (
    "id" SERIAL NOT NULL,
    "repairId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,

    CONSTRAINT "RepairDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceDetail" (
    "id" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "repairDetailId" INTEGER NOT NULL,

    CONSTRAINT "InvoiceDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "idAppointment" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentDetail_appointmentId_key" ON "AppointmentDetail"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "RepairDetails_repairId_key" ON "RepairDetails"("repairId");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceDetail_repairDetailId_key" ON "InvoiceDetail"("repairDetailId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_idAppointment_key" ON "Invoice"("idAppointment");

-- AddForeignKey
ALTER TABLE "Mechanic" ADD CONSTRAINT "Mechanic_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentDetail" ADD CONSTRAINT "AppointmentDetail_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentMedia" ADD CONSTRAINT "AppointmentMedia_appointmentDetailId_fkey" FOREIGN KEY ("appointmentDetailId") REFERENCES "AppointmentDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repairs" ADD CONSTRAINT "Repairs_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repairs" ADD CONSTRAINT "Repairs_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Mechanic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repairs" ADD CONSTRAINT "Repairs_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepairDetails" ADD CONSTRAINT "RepairDetails_repairId_fkey" FOREIGN KEY ("repairId") REFERENCES "Repairs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceDetail" ADD CONSTRAINT "InvoiceDetail_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceDetail" ADD CONSTRAINT "InvoiceDetail_repairDetailId_fkey" FOREIGN KEY ("repairDetailId") REFERENCES "RepairDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_idAppointment_fkey" FOREIGN KEY ("idAppointment") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
