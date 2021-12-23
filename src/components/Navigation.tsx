import { Nav } from "react-bootstrap";
import { url as lasaScanUrl } from "./views/LasaScanView";
import { url as patientMedMatchUrl } from "./views/PatientMedMatchView";

interface NavigationProps {
  activeKey: string;
}

export const Navigation: React.FC<NavigationProps> = (props) => {
  return (
    <Nav
      style={{
        width: "100vw",
        bottom: 0,
        position: "fixed",
        backgroundColor: "white",
      }}
      className="fixed-bottom"
      variant="pills"
      justify
      defaultActiveKey={props.activeKey}
    >
      <Nav.Item>
        <Nav.Link href="/">
          <img alt="home icon" src="icons/home.svg" width="30" height="30" />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href={lasaScanUrl}>
          <img alt="scan icon" src="icons/scan.svg" width="30" height="30" />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href={patientMedMatchUrl}>
          <img
            alt="patient icon"
            src="icons/patient.svg"
            width="30"
            height="30"
          />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link disabled href="#profile">
          <img
            alt="profile icon"
            src="icons/profile.svg"
            width="30"
            height="30"
          />
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Navigation;
