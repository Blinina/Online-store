import { useEffect, useState } from 'react';
import { Modal, Form, FormCheck } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
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
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({});


    const onSubmit = handleSubmit(async (data) => {
        const { image1, image2, type, category, ...rest } = data;
        // const newSalesCount = sales.sales ? sales.count : 0;
        const newDate = {
            type: type.toLowerCase(),
            category: category.toLowerCase(),
            image: [image1, image2],
            // sales: {
            //     sales,
            //     const: newSalesCount,
            // },
            ...rest,
        };

        console.log(newDate)
        try {
            let res = await fetch(`/product/addProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newDate)
            });
            let result = await res.json();
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    });

    return (
        <div>
            <div>
                <h2 className='home-title'>Add new product</h2>
            </div>
            <div>
                <Form onSubmit={onSubmit}>
                    <div className='field-form'>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="Product name"
                                autoFocus
                                {...register("title", { required: true })}
                            />
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
                                {...register("price", { required: true, min: 1 })}
                            />
                        </Form.Group>
                    </div>
                    <div className='field-form'>

                        <Form.Group
                            controlId="Category"
                            className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select size="sm"
                                {...register("category", { required: true })} >
                                <option value="" disabled selected>Select the category</option>
                                <option>Women</option>
                                <option>Men</option>
                                <option>Kids</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group
                            controlId="type"
                            className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Select size="sm"
                                {...register("type", { required: true })} >
                                <option value="" disabled selected>Select the type </option>
                                {watch('category') !== 'Men' && <>
                                    <option>Dresses</option>
                                    <option>Skirt</option>
                                </>}
                                <option>Jacket</option>
                                <option>Shorts</option>
                                <option>T-shirt</option>

                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className='field-form'>
                        <Form.Group
                            className="mb-3"
                            controlId="image1"
                        >
                            <Form.Label>image1</Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                {...register("image1", { required: true })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="image2"
                        >
                            <Form.Label>image2</Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                {...register("image2", { required: true })}
                            />
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
                            {...register("rating", { required: true, min: 0, max: 5 })}
                        />
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
                                defaultValue="0"
                                {...register("sales.count", { min: 0, max: 99 })}
                            />
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
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea"
                            size="sm"
                            className="mb-3"
                            {...register("description", { required: true })}
                        />
                    </Form.Group>
                    <button className='M-btn btn-green center' onClick={onSubmit}>
                        Add product
                    </button>
                </Form>
            </div>
        </div>
    )
}