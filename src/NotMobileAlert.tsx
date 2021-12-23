import { Alert } from "react-bootstrap";
import { isMobile } from "react-device-detect";

interface NotMobileAlertProps {}

const NotMobileAlert: React.FC<NotMobileAlertProps> = (props) => {
  return !isMobile ? (
    <div style={{ width: "100vw", alignItems: "center" }}>
      <Alert className="not-mobile-alert" key="notMobileAlert" variant="danger">
        This web app cannot be used on desktop devices. Please switch to a mobile device.
      </Alert>
    </div>
  ) : null;
};

export default NotMobileAlert;
