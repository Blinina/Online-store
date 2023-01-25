import { ChangeEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import like from "../../assets/images/Like.png"
import blackLike from "../../assets/images/blackLike.png"
import { useAuth } from "../../context/authContext"
import { buildName, getNewPrice } from "../../helpers"
import { addLikeStore, deleteLikeStore, getLike } from "../../store/likeSlice"
import { addLikeAPI, deleteLikeAPI } from "../../http/likeAPI"
import { Product } from "../../TSType"

type sortingType = Record<string, (elem: Product[]) => Product[]>

const sortingVariant: sortingType = {
  none: (elem: Product[]) => elem,
  Rating: (elem: Product[]) => elem.sort((a: Product, b: Product) => b.rating - a.rating),
  Price: (elem: Product[]) => elem.sort((a: Product, b: Product) => b.price - a.price),
}

export default function Cards({ items }: any) {
  const navigate = useNavigate()
  const auth = useAuth()
  const dispatch = useDispatch()
  const [products, setProducts] = useState(items)
  const [sorting, setSorting] = useState("none")

  useEffect(() => {
    setProducts(items)
  }, [items])

  const likeItems = useSelector(getLike)
  const likeArr = likeItems?.map(({ id }) => id)

  const addLike = async (el: Product) => {
    dispatch(addLikeStore({ id: el._id, product: el }))
    auth?.loggedIn != null && addLikeAPI(auth?.loggedIn._id, el._id)
  }

  const deleteLike = async (el: Product) => {
    dispatch(deleteLikeStore({ id: el._id }))
    auth?.loggedIn != null && deleteLikeAPI(auth?.loggedIn._id, el._id)
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setSorting(value)
    const result = sortingVariant[value](items)
    setProducts(result)
  }

  return (
    <>
      {items.length ? (
        <>
          <div className="sortind">
            <Form>
              <Form.Group controlId="sortind">
                <Form.Label>Sort by</Form.Label>
                <Form.Select
                  size="sm"
                  value={sorting}
                  onChange={(e) => {
                    handleChange(e)
                  }}
                >
                  <option value="none" disabled>
                    none
                  </option>
                  <option value="Rating">Rating</option>
                  <option value="Price">Price</option>
                </Form.Select>
                <button type="submit" className="none"></button>
              </Form.Group>
            </Form>
          </div>
          <div className="cards">
            {products?.map((el: Product) => (
              <div className="card-collection" key={el._id}>
                <figure>
                  <div className="images">
                    <img
                      src={el.image[0]}
                      onClick={() => {
                        navigate(`/product/${el._id}`)
                      }}
                      onMouseOver={(e) => (e.currentTarget.src = el.image[1])}
                      onMouseOut={(e) => (e.currentTarget.src = el.image[0])}
                      alt={el.title}
                    />
                    {el.sales.sales && <div className="sales-banner">{el.sales.count} %</div>}
                    {el.newColection && (
                      <div
                        className="new-collection"
                        onClick={() => {
                          navigate("/collection/newColection")
                        }}
                      >
                        New collection
                      </div>
                    )}
                    <div className="container-card-like">
                      <img
                        src={likeArr.includes(el._id) ? blackLike : like}
                        alt="like"
                        onClick={async () => {
                          likeArr.includes(el._id) ? await deleteLike(el) : await addLike(el)
                        }}
                        className="card-like"
                      />
                    </div>
                  </div>
                  <figcaption
                    onClick={() => {
                      navigate(`/product/${el._id}`)
                    }}
                  >
                    <p className="card-title">{buildName(el.title)}</p>
                    <div>
                      {el.sales.sales ? (
                        <div className="sales-price">
                          <p className="price new-price">
                            ${getNewPrice(el.price, el.sales.count)}
                          </p>
                          <p className="old-price">${el.price}</p>
                        </div>
                      ) : (
                        <p className="price static-price">${el.price}</p>
                      )}
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="loading">
          <p>Sorry products not found.</p>
          <p>Choose a different category or type of clothing.</p>
        </div>
      )}
    </>
  )
}
