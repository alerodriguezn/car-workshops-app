export interface AppointmentDetailsResponse {
    appointmentDetails: AppointmentDetails;
}

export interface AppointmentDetails {
    id:               number;
    description:      string;
    appointmentmedia: Appointmentmedia[];
    appointment:      Appointment;
}

export interface Appointment {
    status:     string;
    clientId:   number;
    vehicleId:  number;
    workshopId: number;
}

export interface Appointmentmedia {
    id:                  number;
    appointmentDetailId: number;
    mediaUrl:            string;
}