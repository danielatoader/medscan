import NotMobileAlert from "../../NotMobileAlert";
import Navigation from "../Navigation";
import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

interface LasaScanViewProps {}

const LasaScanView: React.FC<LasaScanViewProps> = (props) => {
  const [barCodedata, setBarCodeData] = useState<string>("Not Found");

  return (
    <>
      <div style={{ backgroundColor: "#ADD8E6", height: "100vh" }}>
        <NotMobileAlert />
        <p
          style={{
            width: "100%",
            textAlign: "center",
            paddingTop: "12vh",
            fontSize: "60px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          LASA Scan
        </p>
        <div style={{ width: "100vw" }}>
          <p style={{ textAlign: "center" }}>{barCodedata}</p>
          <div
            style={{
              display: "block",
              width: "60%",
              height: "50%",
              margin: "auto",
            }}
          >
            <BarcodeScannerComponent
              width={"100%"}
              height={"100%"}
              delay={500}
              onUpdate={(err, result) => {
                if (result) setBarCodeData(result.getText());
                else setBarCodeData("Not Found");
                console.log(err);
              }}
              onError={(error) => setBarCodeData(error.toString())}
              facingMode="environment"
            />
          </div>
        </div>
      </div>
      <Navigation activeKey={url} />
    </>
  );
};

export const url = "/lasa_scan";
export default LasaScanView;
