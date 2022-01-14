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
          <Modal.Title>LASA medication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Be careful! This medication often gets mixed up
          <br />
          <br />
          <b>Please double check.</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Understood
          </Button>
          <Button variant="danger">
            What do I do?
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WarningModal;
