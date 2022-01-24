import MedicationData from "./models/MedicationData";

export interface HistoryItem {
  medData: MedicationData;
  code: string;
  type: string;
}

const history: HistoryItem[] = [];

export default history;
