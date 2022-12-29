import { Modal, Form } from 'react-bootstrap';
import React, { useEffect } from 'react';
// регистрация
type ModalProps = {
    openSignUP: boolean,
    setOpenSignUP: (value: boolean) => void,
    setOpenModal: (value: boolean) => void;
}


export default function SignUp({ openSignUP, setOpenSignUP, setOpenModal }: ModalProps) {
    const handleSignIn = () => {
        setOpenSignUP(false);
        setOpenModal(true);
    }
    const handleSubmit = async () =>{
        let user = {
            'fullName': 'John1',
            'email': 'John123599okokhhh',
            'password': 'Smith1'
          };
       let kek = await fetch(`/auth/registration`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
          });
       let result = await kek.json();
       console.log(result.message);
    }
    return (
        <>
            <Modal show={openSignUP} onHide={() => setOpenSignUP(false)}>
                <Modal.Header>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setOpenSignUP(false)}></button>
                    <div><h3>Sign up</h3></div>
                    <div><p className='form-decription'>Registration takes less than a minute but gives you full control over your orders.</p></div>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="fullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control size="sm"
                                type="email"
                                placeholder="Your full name"
                                autoFocus />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control size="sm"
                                type="email"
                                placeholder="Your working email" />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control size="sm"
                                type="password" />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="confirm-password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control size="sm"
                                type="password"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3">
                            <Form.Label>You role</Form.Label>
                            <Form.Select size="sm">
                                <option>Customer</option>
                                <option>Seller</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='M-btn btn-green' onClick={handleSubmit}>
                        Sign in
                    </button>
                    <div><p>Already have an account? <span className="go-modal" onClick={handleSignIn}> Sign in</span></p></div>
                </Modal.Footer>
            </Modal>
        </>
    );
}