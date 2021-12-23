import { Button, Stack } from "react-bootstrap";
import NotMobileAlert from "../../NotMobileAlert";
import { Navigation } from "../Navigation";
import { url as lasaScanUrl } from "./LasaScanView";
import { url as patientMedMatchUrl } from "./PatientMedMatchView";

interface HomeViewProps {}

const HomeView: React.FC<HomeViewProps> = (props) => {
  return (
    <>      
      <div style={{ backgroundColor: "#ADD8E6", height: "100vh", width: "100vw"}}>
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
          Welcome
        </p>
        <div style={{ position: "relative", top: "50%", left: "50%" }}>
          <Stack
            style={{ position: "absolute", transform: "translate(-50%, -50%)" }}
            gap={2}
            className="col-md-5 mx-auto"
          >
            <Button href={lasaScanUrl} size="lg" variant="secondary">
              LASA Scan
            </Button>
            <Button href={patientMedMatchUrl} size="lg" variant="secondary">
              Patient Medication Match
            </Button>
          </Stack>
        </div>
      </div>
      <Navigation activeKey={url} />
    </>
  );
};

export const url = "/";
export default HomeView;
