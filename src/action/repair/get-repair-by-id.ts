"use server";
import prisma from "@/lib/prisma";

export const getRepairById = async (id: number) => {
    const repair = await prisma.repairs.findUnique({
        where: {
        id,
        },
        select: {
        id: true,
        diagnosis: true,
        repairStatus: true,
        vehicleId: true,
        appointmentId: true,
        managerId: true,
        isRequired: true,
        initialStateImage: true,
        ApprovedByCliente: true,
        repairsDetail: {
            select: {
            id: true,
            description: true,
            cost: true,
            },
        },
        },
    });

    if (!repair) {
        throw new Error("Repair not found");
    }
    
    return repair;
}