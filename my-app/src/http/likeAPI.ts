import axios from 'axios'

export const addLikeAPI = async (user: string, productID: string) => {
  try {
    const res = await axios.post('/like/addProduct', {
      userId: user,
      product: productID
    })
    console.log(res.data)
  } catch (e) {
    console.log(e)
  }
}

export const deleteLikeAPI = async (user: string, productID: string) => {
  try {
    const res = await axios.post('/like/deleteProduct', {
      userId: user,
      product: productID
    })
    console.log(res.data)
  } catch (e) {
    console.log(e)
  }
}
