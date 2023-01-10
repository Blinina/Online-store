import axios from 'axios';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useAuth, typeLoggedIn } from "../../../context/authContext";
import { EMAIL_REGEXP } from '../../../helpers';

type FormValues = {
    fullName: string;
    email: string;
}

export default function Profile() {
    const [errorData, setErrorData] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({});
    const auth = useAuth();
    const { fullName, email, role, _id } = auth?.loggedIn as typeLoggedIn;

    const onSubmit = handleSubmit(async (data) => {
        if (data.fullName === fullName && data.email === email) {
            setErrorData('You have not changed the data');
            return;
        }
        try {
            let res = await axios.post(`/user/updateUser`, {
                userId: _id,
                fullName: data.fullName,
                email: data.email,
            });
            const { message, ...rest } = res.data;
            auth?.logIn(rest);

        } catch (e) {
            console.log(e)
        }
    });
    return (
        <div>
            <div>
                <h2 className='home-title'>My profile</h2>
            </div>
            <div>
                <div>
                    <p><b>My role: </b>{role}</p>
                </div>
                <Form onSubmit={onSubmit}>
                    <div className='field-form'>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                defaultValue={fullName}
                                autoFocus
                                {...register("fullName")}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="price"
                        >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                size="sm"
                                type="email"
                                defaultValue={email}
                                {...register("email", {
                                    validate: {
                                        value: v => EMAIL_REGEXP.test(v) || 'Invalid e-mail'
                                    }
                                })}
                            />
                            {errors.email && <span className="danger">{errors.email.message}</span>}
                        </Form.Group>
                        {errorData && <span className="danger">{errorData}</span>}
                    </div>
                    <button className='M-btn btn-green center' onClick={onSubmit}>
                        Edit profile
                    </button>
                </Form>
            </div>
        </div>
    )
}