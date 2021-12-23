import NotMobileAlert from "../../NotMobileAlert";
import Navigation from "../Navigation";

interface LasaScanViewProps {}

const LasaScanView: React.FC<LasaScanViewProps> = (props) => {
  return (
    <>
      <div style={{ backgroundColor: "#ADD8E6", height: "100vh" }}>
        <NotMobileAlert />
        <p
          style={{
            width: "100%",
            textAlign: "center",
            top: "20%",
            position: "absolute",
            fontSize: "60px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          LASA Scan
        </p>
      </div>
      <Navigation activeKey={url} />
    </>
  );
};

export const url = "/lasa_scan";
export default LasaScanView;
