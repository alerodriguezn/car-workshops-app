"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import { AppointmentPicker } from "./AppointmentPicker";

interface Props {
  appointmentId: number;
  appointmentMedia: string;
}

export const AppointmentDrawer = ({
  appointmentId,
  appointmentMedia,
}: Props) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button color="primary">View</Button>
      </DrawerTrigger>

      <DrawerContent className="flex justify-center items-center">
        <DrawerHeader>
          <DrawerTitle className="text-center">
            Appointment Management
          </DrawerTitle>
          <DrawerDescription className="text-center">
            This action cannot be undone.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex justify-center gap-10">
          <AppointmentPicker appointmentId={appointmentId} />
          <Image
            src={appointmentMedia}
            alt="Image Problem"
            height={200}
            width={200}
            className="rounded-lg"
          />
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
