import { Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/authContext';
import { EMAIL_REGEXP } from '../../helpers';
import { closeModal } from '../../store/modalSlice';
import { useDispatch } from 'react-redux';

type ModalProps = {
    openSignUP: boolean,
    setOpenSignUP: (value: boolean) => void,
};

type FormValues = {
    fullName: string;
    email: string;
    password: string;
    conformPassword: string;
    role: string;
};

export default function SignUp({ openSignUP, setOpenSignUP }: ModalProps) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({});
    const [errorAuth, setErrorAuth] = useState();
    const auth = useAuth();
    const dispatch = useDispatch();

    const handleSignIn = () => {
        setOpenSignUP(false);
        dispatch(closeModal());
    };
    
    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await fetch(`/user/registration`, {
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
                setOpenSignUP(false);
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
                            <Form.Label>Name</Form.Label>
                            <Form.Control size="sm"
                                type="text"
                                placeholder="Your name"
                                className={(errorAuth || errors.fullName) && 'is-invalid'}
                                autoFocus
                                {...register("fullName", {
                                    required: {
                                        value: true,
                                        message: 'Name is required'
                                    },
                                })} />
                            {errors.fullName && <span className="danger">{errors.fullName.message}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control size="sm"
                                type="email"
                                placeholder="Your working email"
                                className={(errorAuth || errors.email) && 'is-invalid'}
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is required'
                                    },
                                    validate: {
                                        value: v => EMAIL_REGEXP.test(v) || 'Invalid e-mail'
                                    }
                                })}
                            />
                            {errors.email && <span className="danger">{errors.email.message}</span>}
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control size="sm"
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
                            className="mb-3"
                            controlId="conformPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control size="sm"
                                type="password"
                                className={(errorAuth || errors.conformPassword) && 'is-invalid'}
                                {...register("conformPassword", {
                                    required: {
                                        value: true,
                                        message: 'Confirm Password is required'
                                    },
                                    validate: {
                                        value: v => v === watch('password') || 'Password mismatch',
                                    }
                                })}
                            />
                            {errors.conformPassword && <span className="danger">{errors.conformPassword.message}</span>}
                        </Form.Group>
                        <Form.Group
                            controlId="role"
                            className="mb-3">
                            <Form.Label>You role</Form.Label>
                            <Form.Select size="sm"
                                {...register("role")} >
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