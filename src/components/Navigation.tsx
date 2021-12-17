import { Nav } from "react-bootstrap";

interface NavigationProps {}

export const Navigation: React.FC<NavigationProps> = (props) => {
  return (
    <Nav style={{bottom: 0, position: "absolute", backgroundColor: "white"}} className="fixed-bottom" variant="pills" justify defaultActiveKey="/">
      <Nav.Item>
        <Nav.Link href="/">
          <img alt="home icon" src="icons/home.svg" width="30" height="30" />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#lasa-scan">
          <img alt="scan icon" src="icons/scan.svg" width="30" height="30" />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#patient-med-match">
          <img
            alt="patient icon"
            src="icons/patient.svg"
            width="30"
            height="30"
          />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#profile">
          <img alt="profile icon" src="icons/profile.svg" width="30" height="30" />
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Navigation;
