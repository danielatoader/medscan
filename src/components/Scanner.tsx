import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { Result } from "@zxing/library";

interface ScannerProps {
    onData: (err: any, data: Result | undefined) => void;
    onError: (err: string | DOMException) => void;
}

const Scanner: React.FC<ScannerProps> = (props) => {

    return (<div
        style={{
          lineHeight: "0",
          width: "60%",
          height: "50%",
          margin: "auto",
          borderStyle: "solid",
          borderColor: "red"
        }}
      >
        <BarcodeScannerComponent
          delay={200}
          onUpdate={props.onData}
          onError={props.onError}
          facingMode="environment"
        />
        </div>);
}

export default Scanner;