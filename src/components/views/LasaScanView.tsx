import NotMobileAlert from "../../NotMobileAlert";
import Navigation from "../Navigation";
import React, { useEffect, useRef, useState } from "react";
import Scanner from "../Scanner";
import { playSuccessSound } from "../../utils/sounds";
import {
  animateBackgroundError,
  animateBackgroundSuccess,
} from "../../utils/animations";
import fs from "fs";
import { Button } from "react-bootstrap";

interface LasaScanViewProps {}

const LasaScanView: React.FC<LasaScanViewProps> = (props) => {
  const [barCodedata, setBarCodeData] = useState<string>("-");

  const backgroundRef = useRef<HTMLDivElement>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  useEffect(() => {
    animateBackgroundSuccess(backgroundRef.current);
    playSuccessSound();
  }, [barCodedata]);

  return (
    <>
      <div
        ref={backgroundRef}
        style={{ backgroundColor: "#ADD8E6", height: "100vh" }}
      >
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
        <div className="text-center" style={{ width: "100vw" }}>
          {!isScanning ? (
            <Button
              style={{}}
              size="lg"
              variant="primary"
              onClick={() => setIsScanning(true)}
            >
              start scanning
            </Button>
          ) : (
            <>
              <p style={{ textAlign: "center" }}>
                <b>Last item: </b>
                {barCodedata}
              </p>
              <Scanner
                onData={(err, result) => {
                  if (result && result.getText() !== barCodedata) {
                    setBarCodeData(result.getText());
                  }
                  console.log(err);
                }}
                onError={(error) => {
                  setBarCodeData(error.toString());
                  animateBackgroundError(backgroundRef.current);
                }}
              />
            </>
          )}
        </div>
      </div>
      <Navigation activeKey={url} />
    </>
  );
};

export const url = "/lasa_scan";
export default LasaScanView;
