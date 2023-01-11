import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Cards from './Cards';
import { useForm } from 'react-hook-form';
import { Form, FormCheck } from 'react-bootstrap';
import { Product } from '../../TSType';
import Spinner from 'react-bootstrap/Spinner';

type FormType = {
    "men"?: boolean;
    "women"?: boolean;
    "dresses"?: boolean;
    "skirt"?: boolean;
    "jacket": boolean;
    "shorts": boolean;
    "t-shirt": boolean;
};
export default function Collection() {
    const [items, setItems] = useState<Product[]>([]);
    const [serverItems, setServerItems] = useState<Product[]>([]);
    const [isLoaded, setIsLoaded] = useState(true);
    const categoryTypeAll = ['newColection', 'sales'];
    const [chooseAll, setChooseAll] = useState(true)
    const useParamsId = useParams();
    const CategoryId = useParamsId.id;
    const { register, setValue, watch, handleSubmit } = useForm<FormType>({});

    useEffect(() => {
        setChooseAll(true);
        getChooseCheckbox();
        setIsLoaded(true);
        const getProduct = async () => {
            const res = await axios.get('/category', {
                params: {
                    CategoryId
                }
            })
            setServerItems(res.data);
            setItems(res.data);
            setIsLoaded(false);
        }
        getProduct();
    }, [CategoryId]);

    const onSubmitType = handleSubmit((data) => {
        const entries = Object.entries(data)
            .filter((el) => el[1])
            .map(el => el[0]);

        let res: Product[] = [];
        serverItems.forEach((el: Product) => {
            if (entries.length === 1 && (entries.includes('women') || entries.includes('men'))) {
                return el.category === entries[0] ? res.push(el) : null;
            }
            if (entries.length === 2 && entries.includes('women') && entries.includes('men')) {
                setChooseAll(true);
                handlerAll();
                return el.category === entries[0] ? res.push(el) : null;
            }
            if (entries.includes('women') && !entries.includes('men')) {
                return (el.category === 'women' && entries.includes(el.type)) ? res.push(el) : null;

            } if (entries.includes('men') && !entries.includes('women')) {
                return (el.category === 'men' && entries.includes(el.type)) ? res.push(el) : null;
            }
            else {
                return entries.includes(el.type) ? res.push(el) : null
            }
        });
        setItems(res);
    });

    const getName = (param: string, name = param) => {
        const filterType = serverItems.filter((el) => el.type === param);
        const filterCategory = serverItems.filter((el) => el.category === param);
        return `${name[0].toUpperCase() + name.slice(1)} (${name === param ? filterType.length : filterCategory.length})`
    };

    const getChooseCheckbox = () => {
        categoryTypeAll.includes(CategoryId as string) && setValue('men', true)
        categoryTypeAll.includes(CategoryId as string) && setValue('women', true)
        CategoryId !== "men" && setValue('dresses', true)
        CategoryId !== "men" && setValue('skirt', true)
        setValue('jacket', true)
        setValue('shorts', true)
        setValue('t-shirt', true)
    };
    const handlerAll = () => {
        if (chooseAll) {
            setChooseAll(false);
            setValue('men', false)
            setValue('women', false)
            setValue('dresses', false)
            setValue('skirt', false)
            setValue('jacket', false)
            setValue('shorts', false)
            setValue('t-shirt', false)
        } else {
            setChooseAll(true);
            getChooseCheckbox()
        }
    };
    return (
        <div className="collection-page">
            <div className="filter-card">
                <div className='text-center'><b>Filters</b></div>
                <hr />
                <p className='text-center'>Type clothes</p>
                <p className='invalid' onClick={handlerAll}>{chooseAll ? 'Clear all' : 'Choose all'}</p>
                <Form onSubmit={onSubmitType} className="filter-form">
                    <div className='filter-form-check'>
                        {
                            categoryTypeAll.includes(CategoryId as string)
                            &&
                            <div>
                                <Form.Group
                                    controlId="men"
                                >
                                    <FormCheck id="men" label={getName("men", "Men`s")}
                                        type="switch"
                                        {...register("men")}
                                    />
                                </Form.Group>
                                <Form.Group
                                    controlId="women"
                                >
                                    <FormCheck id="women" label={getName("women", "Women`s")}
                                        type="switch"
                                        {...register("women")}
                                    />
                                </Form.Group>
                                <hr />
                            </div>
                        }
                        {
                            (CategoryId === 'women'
                                ||
                                (categoryTypeAll.includes(CategoryId as string) && watch('women')))
                            &&
                            <div>
                                <Form.Group
                                    controlId="dresses"
                                >
                                    <FormCheck id="dresses" label={getName("dresses")}
                                        {...register("dresses")}
                                    />
                                </Form.Group>
                                <Form.Group
                                    controlId="skirt"
                                >
                                    <FormCheck id="skirt" label={getName("skirt")}
                                        {...register("skirt")}
                                    />
                                </Form.Group>
                            </div>
                        }
                        <Form.Group
                            controlId="jacket"
                            className='main-chack'
                        >
                            <FormCheck id="jacket" label={getName("jacket")}
                                {...register("jacket")}
                            />
                        </Form.Group>
                        <Form.Group
                            controlId="shorts"
                            className='main-chack'
                        >
                            <FormCheck id="shorts" label={getName("shorts")}
                                {...register("shorts")}
                            />
                        </Form.Group>
                        <Form.Group
                            controlId="t-shirt"
                            className='main-chack'
                        >
                            <FormCheck id="t-shirt" label={getName("t-shirt")}
                                {...register("t-shirt")}
                            />
                        </Form.Group>
                    </div>
                    <button className='M-btn btn-green' onClick={onSubmitType}>
                        Show
                    </button>
                </Form>
            </div>
            {isLoaded
                ?
                <div className='loading'>
                    <Spinner animation="border" variant="success" />
                </div>
                :
                <div className='rating-cards-container'>
                    {
                        items
                            ?
                            <Cards items={items} />
                            :
                            <div>
                                <p>Sorry products not found.</p>
                                <p>Choose a different category or type of clothing.</p>
                            </div>
                    }
                </div>
            }
        </div>
    )
}
