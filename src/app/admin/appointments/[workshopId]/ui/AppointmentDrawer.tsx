"use client";

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

import React from "react";
import { AppointmentPicker } from "./AppointmentPicker";

interface Props {
  appointmentId: number;
}

export const AppointmentDrawer = ({ appointmentId }: Props) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button color="primary">Manage</Button>
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
        <AppointmentPicker appointmentId={appointmentId} />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
