export interface AppointmentsList {
    appointments: Appointment[];
}

export interface Appointment {
    id:                number;
    status:            string;
    clientId:          number;
    vehicleId:         number;
    workshopId:        number;
    appointmentDetail: AppointmentDetail;
    createdAt:         Date;
}

export interface AppointmentDetail {
    description:      string;
    appointmentmedia: Appointmentmedia[];
}

export interface Appointmentmedia {
    id:                  number;
    appointmentDetailId: number;
    mediaUrl:            string;
}


