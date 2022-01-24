import MedicationData from "./models/MedicationData";

export interface HistoryItem {
  medData: MedicationData;
  code: string;
  type: string;
  timestamp: string;
}

const history: HistoryItem[] = [];

export default history;
