import MedicationData from "./MedicationData";

interface PatientMedData {
  med: MedicationData;
  patient: string;
  match: boolean;
}

export default PatientMedData;
