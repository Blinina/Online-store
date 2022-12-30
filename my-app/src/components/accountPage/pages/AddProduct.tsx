import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';


export default function AddProduct() {

    const data = {

        "title": " Curve soft all over embroidered maxi dress in khaki",
        "price": 37,
        "description": "Woven fabric\nSoft, floaty finish\nBody: 100% Polyester, Lining: 100% Polyester.",
        "category": "women",
        "type": "dresses",
        "image": ["https://images.asos-media.com/products/asos-design-curve-soft-all-over-embroidered-maxi-dress-in-khaki/202305718-1-khaki?$n_480w$&wid=476&fit=constrain", "https://images.asos-media.com/products/asos-design-curve-soft-all-over-embroidered-maxi-dress-in-khaki/202305718-2?$n_480w$&wid=476&fit=constrain"],
        "rating": 4.6,
        "newColection": false,
        "sales": {
            "sales": true,
            "count": 10,
        }

    }

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({});
    const onSubmit = handleSubmit(async (data) => {
        try {
            let res = await fetch(`/product/addProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });
            let result = await res.json();
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    });

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Your working email"
                    autoFocus
                    {...register("title", { required: true })}
                />
            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="password"
            >
                <Form.Label>Password</Form.Label>
                <Form.Control
                    size="sm"
                    type="password"
                    {...register("password", { required: true })}
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
    )
}