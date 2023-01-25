import { Button, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { showModal } from "../../../../store/modalSlice"

interface ModalProps {
  openOrderModal: any
  setopenOrderModal: (value: { user: boolean; text: string }) => void
}

export default function OrderModal({ openOrderModal, setopenOrderModal }: ModalProps) {
  const dispatch = useDispatch()
  const handleSingIn = () => {
    setopenOrderModal({ user: openOrderModal.user, text: "" })
    dispatch(showModal())
  }
  return (
    <Modal
      show={!!openOrderModal.text}
      onHide={() => {
        setopenOrderModal({ user: openOrderModal.user, text: "" })
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{openOrderModal.text}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        {openOrderModal.user ? (
          <Button
            className="primary"
            onClick={() => {
              setopenOrderModal({ user: openOrderModal.user, text: "" })
            }}
          >
            Close
          </Button>
        ) : (
          <Button className="btn-green" onClick={handleSingIn}>
            SignIn/SignUp
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}
