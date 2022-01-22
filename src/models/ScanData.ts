import { BarCodeBounds } from "expo-barcode-scanner";

interface ScanData {
  bounds: BarCodeBounds | undefined;
  data: string;
  type: string;
}

export default ScanData;
