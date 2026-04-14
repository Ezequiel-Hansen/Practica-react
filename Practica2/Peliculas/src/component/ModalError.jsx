import { Modal, Button } from "react-bootstrap";

export const ModalError = ({message, onClose, showModal}) => {
    return (
        <Modal show={showModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className="text-danger">Atencion!!!!!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
