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
export const patient_med_history: PatientMedHistoryItem[] = [];
