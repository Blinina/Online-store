import { Modal, Form, FormCheck } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useAuth, typeLoggedIn } from "../../../context/authContext";
type FormValues = {
    fullName: string;
    email: number;
}

export default function Profile() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({});
    const auth = useAuth();
    const { fullName, email, role } = auth?.loggedIn as typeLoggedIn;

    const onSubmit = handleSubmit(async (data) => console.log(data));
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
                                {...register("email")}
                            />
                        </Form.Group>
                    </div>
                    <button className='M-btn btn-green center' onClick={onSubmit}>
                        Edit profile
                    </button>
                </Form>
            </div>
        </div>
    )
}