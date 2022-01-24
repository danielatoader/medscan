import MedicationData from "./models/MedicationData";

export interface LasaHistoryItem {
  medData: MedicationData;
  code: string;
  type: string;
  timestamp: string;
}

export interface PatientMedHistoryItem {
  patientName: string;
  medName: string;
  match: boolean;
  timestamp: string;
}

export const lasa_history: LasaHistoryItem[] = [];
export const patient_med_history: PatientMedHistoryItem[] = [
  {
    patientName: "Barack Obama",
    medName: "Codeine",
    match: true,
    timestamp: new Date().toUTCString(),
  },
  {
    patientName: "Jacky Chan",
    medName: "Dafalgan",
    match: true,
    timestamp: new Date().toUTCString(),
  },
  {
    patientName: "Ethan",
    medName: "Paracetamol",
    match: false,
    timestamp: new Date().toUTCString(),
  },
  {
    patientName: "Daphne",
    medName: "Zyrtec",
    match: true,
    timestamp: new Date().toUTCString(),
  },
  {
    patientName: "Jeff Bezos",
    medName: "Ventolin",
    match: false,
    timestamp: new Date().toUTCString(),
  }
];
