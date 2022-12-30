import { Modal, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { useAuth } from '../../context/authContext';


// регистрация
type ModalProps = {
    openSignUP: boolean,
    setOpenSignUP: (value: boolean) => void,
    setOpenModal: (value: boolean) => void;
};

type FormValues = {
    fullName: string;
    email: string;
    password: string;
    conformPassword: string;
    role: string;
};

export default function SignUp({ openSignUP, setOpenSignUP, setOpenModal }: ModalProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({});
    const [errorAuth, setErrorAuth] = useState();

    const auth = useAuth();

    const handleSignIn = () => {
        setOpenSignUP(false);
        setOpenModal(true);
    }
    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log(data)
            const response = await fetch(`/auth/registration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });
            let result = await response.json();
            if (result.message) {
                setErrorAuth(result.message)
            } else {
                auth.logIn(result)
            }

        } catch (e) {
            console.log(e)
        }
    });

    return (
        <>
            <Modal show={openSignUP} onHide={() => setOpenSignUP(false)}>
                <Modal.Header>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setOpenSignUP(false)}></button>
                    <div><h3>Sign up</h3></div>
                    <div><p className='form-decription'>Registration takes less than a minute but gives you full control over your orders.</p></div>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="fullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control size="sm"
                                type="text"
                                placeholder="Your full name"
                                {...register("fullName", { required: true })}
                                autoFocus />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control size="sm"
                                type="email"
                                placeholder="Your working email"
                                {...register("email", { required: true })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control size="sm"
                                type="password"
                                {...register("password", { required: true })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="conformPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control size="sm"
                                type="password"
                                {...register("conformPassword", { required: true })}
                            />
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
                    <div><p>Already have an account? <span className="go-modal" onClick={handleSignIn}> Sign in</span></p></div>
                </Modal.Footer>
            </Modal>
        </>
    );
}