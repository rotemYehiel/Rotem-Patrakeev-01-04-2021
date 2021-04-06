import { Modal, Button } from 'react-bootstrap';
const MsgModal = (props) => {
    const { msg, onHide, theme } = props;
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Oops...
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{msg}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={theme} onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default MsgModal;