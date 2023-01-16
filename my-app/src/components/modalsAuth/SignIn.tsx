import { useState } from 'react'
import { Modal, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../../context/authContext'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../store/modalSlice'
import { RootState } from '../../store/store'

interface ModalProps {
  setOpenSignUP: (value: boolean) => void
}
interface FormValues {
  email: string
  password: string
  role: string
}

export default function SignIn ({ setOpenSignUP }: ModalProps) {
  const auth = useAuth()
  const dispatch = useDispatch()
  const [errorAuth, setErrorAuth] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({})
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      })
      const result = await res.json()
      if (result.message) {
        setErrorAuth(result.message)
      } else {
        auth?.logIn(result)
        dispatch(closeModal())
      }
    } catch (e) {
      console.log(e)
    }
  })

  const handleSignUP = () => {
    setOpenSignUP(true)
    dispatch(closeModal())
  }

  const sliceOpen = useSelector((store: RootState) => store.modal.show)
  return (
    <>
      <Modal show={sliceOpen} onHide={() => dispatch(closeModal())}>
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => dispatch(closeModal())}
          ></button>
          <div>
            <h3>Sign in</h3>
          </div>
          <div>
            <p className="form-decription">
              Sign in to your account using email and password provided during
              registration.
            </p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                size="sm"
                type="email"
                placeholder="Your working email"
                className={(errorAuth || errors.email != null) ? 'is-invalid' : ''}
                autoFocus
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email is required'
                  }
                })}
              />
              {(errors.email != null) && (
                <span className="danger">{errors.email.message}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                size="sm"
                type="password"
                className={(errorAuth || errors.password != null) ? 'is-invalid' : ''}
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required'
                  }
                })}
              />
              {(errors.password != null) && (
                <span className="danger">{errors.password.message}</span>
              )}
            </Form.Group>
            <Form.Group controlId="role" className="mb-3">
              <Form.Label>You role</Form.Label>
              <Form.Select size="sm" {...register('role', { required: true })}>
                <option>Customer</option>
                <option>Seller</option>
              </Form.Select>
              <span className="invalid">{errorAuth}</span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="M-btn btn-green" onClick={onSubmit}>
            Sign in
          </button>
          <div>
            <p>
              Don't have an account?{' '}
              <span className="go-modal" onClick={handleSignUP}>
                Sign up
              </span>
            </p>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}
