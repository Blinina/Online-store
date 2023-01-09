import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from '../../context/authContext';
import { useForm } from 'react-hook-form';

//вход
type ModalProps = {
  open: boolean,
  setOpenModal: (value: boolean) => void;
  setOpenSignUP: (value: boolean) => void,
}
type FormValues = {
  email: string;
  password: string;
  role: string;
};

export default function SignIn({ open, setOpenModal, setOpenSignUP }: ModalProps) {
  const auth = useAuth();
  const [errorAuth, setErrorAuth] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({});
  const onSubmit = handleSubmit(async (data) => {
    try {
      let res = await fetch(`/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });
      let result = await res.json();
      if (result.message) {
        setErrorAuth(result.message)
      } else {
        auth?.logIn(result);
        setOpenModal(false);
      }
    } catch (e) {
      console.log(e)
    }
  });

  const handleSignUP = () => {
    setOpenSignUP(true);
    setOpenModal(false);
  }

  return (
    <>
      <Modal show={open} onHide={() => setOpenModal(false)}>
        <Modal.Header>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setOpenModal(false)}></button>
          <div><h3>Sign in</h3></div>
          <div><p className='form-decription'>Sign in to your account using email and password provided during registration.</p></div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                size="sm"
                type="email"
                placeholder="Your working email"
                className={(errorAuth || errors.email) && 'is-invalid'}
                autoFocus
                {...register("email", {
                  required: {
                    value: true,
                    message: 'Email is required'
                  },
                })}
              />
              {errors.email && <span className="danger">{errors.email.message}</span>}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="password"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                size="sm"
                type="password"
                className={(errorAuth || errors.password) && 'is-invalid'}
                {...register("password", {
                  required: {
                    value: true,
                    message: 'Password is required'
                  },
                })}
              />
              {errors.password && <span className="danger">{errors.password.message}</span>}
            </Form.Group>
            <Form.Group
              controlId="role"
              className="mb-3">
              <Form.Label>You role</Form.Label>
              <Form.Select size="sm"
                {...register("role", { required: true })} >
                <option>Customer</option>
                <option>Seller</option>
              </Form.Select>
              <span className='invalid'>{errorAuth}</span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className='M-btn btn-green' onClick={onSubmit}>
            Sign in
          </button>
          <div><p>Don't have an account? <span className="go-modal" onClick={handleSignUP}>Sign up</span></p></div>
        </Modal.Footer>
      </Modal>
    </>
  );
}


