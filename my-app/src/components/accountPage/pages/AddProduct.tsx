import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, FormCheck } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import NotifComponent from './modals/NotifComponent';
type FormValues = {
    title: string;
    price: number;
    description: string;
    category: string;
    type: string;
    image1: string;
    image2: string;
    rating: number;
    newColection: boolean;
    sales: {
        sales: boolean,
        count: number,
    },
};

export default function AddProduct() {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormValues>({});
    const [showModal, setShowModal] = useState('')
    const onSubmit = handleSubmit(async (data) => {
        const { image1, image2, type, category, ...rest } = data;
        const newDate = {
            type: type.toLowerCase(),
            category: category.toLowerCase(),
            image: [image1, image2],
            ...rest,
        };
        try {
            let res = await axios.post(`/addProduct`, {
                newDate 
            });
            console.log(res.data)
            setShowModal(res.data)
            reset();
        } catch (e) {
            console.log(e)
        }
    });

    return (
        <div>
            <div>
                <h2 className='home-title' onClick={() => setShowModal('kek')}>Add new product</h2>
            </div>
            <div>
                <Form onSubmit={onSubmit}>
                    <div className='field-form'>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="Product name"
                                className={errors?.title && 'is-invalid'}
                                autoFocus
                                {...register("title", {
                                    required: {
                                        value: true,
                                        message: 'Name is required'
                                    },
                                })}
                            />
                            {errors.title && <span className="danger">{errors.title.message}</span>}
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="price"
                        >
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                size="sm"
                                type="number"
                                min="0"
                                className={errors?.price && 'is-invalid'}
                                placeholder="Product price"
                                {...register("price", {
                                    required: {
                                        value: true,
                                        message: 'Price is required'
                                    }, min: {
                                        value: 1,
                                        message: 'Field cannot be negative'
                                    }
                                })}
                            />
                            {errors.price && <span className="danger">{errors.price.message}</span>}
                        </Form.Group>
                    </div>
                    <div className='field-form'>
                        <Form.Group
                            controlId="Category"
                            className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select size="sm"
                                className={errors?.category && 'is-invalid'}
                                {...register("category", {
                                    required: {
                                        value: true,
                                        message: 'Category is required'
                                    }
                                })} >
                                <option value="" disabled selected>Select the category</option>
                                <option>Women</option>
                                <option>Men</option>
                                <option>Kids</option>
                            </Form.Select>
                            {errors.category && <span className="danger">{errors.category.message}</span>}
                        </Form.Group>
                        <Form.Group
                            controlId="type"
                            className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Select size="sm"
                                className={errors?.type && 'is-invalid'}
                                {...register("type",
                                    {
                                        required: {
                                            value: true,
                                            message: 'Type is required'
                                        }
                                    }
                                )} >
                                <option value="" disabled selected>Select the type </option>
                                {watch('category') !== 'Men' && <>
                                    <option>Dresses</option>
                                    <option>Skirt</option>
                                </>}
                                <option>Jacket</option>
                                <option>Shorts</option>
                                <option>T-shirt</option>
                            </Form.Select>
                            {errors.type && <span className="danger">{errors.type.message}</span>}
                        </Form.Group>
                    </div>
                    <div className='field-form'>
                        <Form.Group
                            className="mb-3"
                            controlId="image1"
                        >
                            <Form.Label>First Image</Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="First image`s URL"
                                className={errors?.image1 && 'is-invalid'}
                                {...register("image1", {
                                    required: {
                                        value: true,
                                        message: 'First Image is required'
                                    }
                                })}
                            />
                            {errors.image1 && <span className="danger">{errors.image1.message}</span>}
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="image2"
                        >
                            <Form.Label>Second Image</Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="Second image`s URL"
                                className={errors?.image2 && 'is-invalid'}
                                {...register("image2", {
                                    required: {
                                        value: true,
                                        message: 'Second Image is required'
                                    }
                                })}
                            />
                            {errors.image2 && <span className="danger">{errors.image2.message}</span>}
                        </Form.Group>
                    </div>
                    <Form.Group
                        className="mb-3"
                        controlId="rating"
                    >
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                            size="sm"
                            type="number"
                            min="0"
                            max="5"
                            className={errors?.rating && 'is-invalid'}
                            placeholder="LOL :) come up with"
                            {...register("rating", {
                                required: {
                                    value: true,
                                    message: 'Rating is required'
                                }, min: {
                                    value: 1,
                                    message: 'Rating cannot be less than 1'
                                }, max: {
                                    value: 5,
                                    message: 'Rating cannot be greater than 99'
                                }
                            })}
                        />
                        {errors.rating && <span className="danger">{errors.rating.message}</span>}
                    </Form.Group>
                    <div className='field-form'>
                        <Form.Group
                            className="mb-3"
                            controlId="sales"
                        >
                            <FormCheck id="sales" label="Sales"
                                {...register("sales.sales")}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="salesCount"
                        >
                            <Form.Label>Sales count</Form.Label>
                            <Form.Control
                                size="sm"
                                type="number"
                                disabled={!watch("sales.sales")}
                                className={errors?.sales?.count && 'is-invalid'}
                                defaultValue="0"
                                {...register("sales.count", {
                                    min: {
                                        value: 1,
                                        message: 'Sales count cannot be less than 1'
                                    }, max: {
                                        value: 99,
                                        message: 'Sales count cannot be greater than 99'
                                    }
                                })}
                            />
                            {errors?.sales?.count && <span className="danger">{errors?.sales?.count.message}</span>}
                        </Form.Group>
                    </div>
                    <Form.Group
                        className="mb-3"
                        controlId="newColection"
                    >
                        <FormCheck id="newColection" label="New colection"
                            {...register("newColection")}
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="description"
                        className="mb-3"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea"
                            className={errors?.description && 'is-invalid'}
                            size="sm"
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: 'Description is required'
                                },
                            })}
                        />
                        {errors.description && <span className="danger">{errors.description.message}</span>}
                    </Form.Group>
                    <button className='M-btn btn-green center' onClick={onSubmit}>
                        Add product
                    </button>
                </Form>
            </div>
            {!!showModal && <NotifComponent show={showModal} setShowModal={setShowModal} />}
        </div>
    )
}