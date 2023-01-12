import { useAuth } from '../../../context/authContext'
import Table from 'react-bootstrap/Table'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { BasketClient, deleteProductToBasket, getBasket } from '../../../store/basketSlice'
import { deleteProductToBasketAPI } from '../../../http/basketAPI'
import { Product } from '../../../TSType'
import { useState } from 'react'
import OrderModal from './modal/OrderModal'
import { buildName } from '../../../helpers'

interface Sales {
  sales: boolean
  count: number
}

export default function Bag () {
  const navigate = useNavigate()
  const auth = useAuth()
  const { pathname } = useLocation()
  const dispath = useDispatch()
  const items = useSelector(getBasket).flat()
  const [openOrderModal, setopenOrderModal] = useState({ user: false, text: '' })

  const getPrice = (price: number, sales: Sales) => {
    const newPrice: number = Math.floor((price * (1 - sales.count / 100)) * 100) / 100
    return sales.sales ? newPrice : price
  }

  const getFullPrice = (quantity: number, price: number, sales: Sales) => {
    const correntPrice: number = getPrice(price, sales)
    return quantity * correntPrice
  }
  const getSubtotal = () => {
    const result = items.reduce((acc: number, item: BasketClient) => {
      acc += getFullPrice(item.quantity, item.product.price, item.product.sales)
      return acc
    }, 0)
    return result
  }

  const handleDelete = async (el: BasketClient) => {
    dispath(deleteProductToBasket({ id: el.product._id }))
    ;((auth?.loggedIn) != null) && deleteProductToBasketAPI(auth?.loggedIn._id, el.product)
  }

  const handleComplit = () => {
    if (auth?.loggedIn?._id) {
      setopenOrderModal({ user: true, text: 'Sorry,  this is a study project. 😁' }); return
    }
    setopenOrderModal({ user: false, text: 'To place an order please login' })
  }

  return (
        <div className={pathname === '/bag' ? ' bag-container mb-30' : 'bag-container'}>
            <div>
                <div>
                    <h2 className='home-title'>My Bag</h2>
                </div>
                <div>
                    {(items.length > 0)
                      ? <Table striped hover>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item: BasketClient) =>
                                <tr key={item.id}>
                                    <th className="bag-name" onClick={() => { navigate(`/product/${item.product._id}`) }}>
                                        <img className="bag-img"
                                            src={item.product.image[0]}
                                            alt={item.product.title} />
                                        <div>{buildName(item.product.title)}</div>
                                    </th>
                                    <th><div>${getPrice(item.product.price, item.product.sales)}</div></th>
                                    <th><div>{item.quantity}</div></th>
                                    <th><div>${getFullPrice(item.quantity, item.product.price, item.product.sales).toFixed(2)}</div></th>
                                    <th><div className="M-btn" onClick={async () => { await handleDelete(item) }}>Delete</div></th>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                      : <div>
                            <h4>Your bag is empty</h4>
                        </div>
                    }
                </div>
            </div>
            {pathname === '/bag' &&
                <div className="result-card">
                    <div><b>Subtotal:</b> ${getSubtotal().toFixed(2)}</div>
                    <div><p>Number of products: {items.length}</p></div>
                    <div className="M-btn btn-green" onClick={handleComplit}>Complete order</div>
                </div>}

            {!!openOrderModal.text && <OrderModal openOrderModal={openOrderModal} setopenOrderModal={setopenOrderModal} />}
        </div>
  )
}
