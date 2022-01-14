import { Button, Modal } from "react-bootstrap";

interface WarningModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const WarningModal: React.FC<WarningModalProps> = (props) => {
  const handleClose = () => props.setShow(false);

  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>LASA identified!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Be careful, this medication often gets mixed up
          <br />
          <br />
          <b>Please double check.</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            I double checked
          </Button>
          <Button variant="danger">
            Help
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WarningModal;
