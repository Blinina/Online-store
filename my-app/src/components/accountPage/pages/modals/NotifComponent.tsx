import { Modal, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

interface ModalProps {
  show: string
  setShowModal: (value: string) => void
}

export default function NotifComponent({ show, setShowModal }: ModalProps) {
  const navigate = useNavigate()

  const goHome = () => {
    setShowModal("")
    navigate("/")
  }

  return (
    <Modal
      show={!!show}
      onHide={() => {
        setShowModal("")
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{show}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={goHome}>
          Go to home page
        </Button>
        <Button
          className="btn-green"
          onClick={() => {
            setShowModal("")
          }}
        >
          Add new product
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
