import axios from "axios"
import { useState } from "react"
import { Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useAuth, typeLoggedIn } from "../../../context/authContext"
import { useToastify } from "../../../context/toastContext"
import { EMAIL_REGEXP } from "../../../helpers"

interface FormValues {
  fullName: string
  email: string
}

export default function Profile() {
  const [errorData, setErrorData] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({})
  const auth = useAuth()
  const { successToast, errorToast } = useToastify()
  const { fullName, email, role, _id } = auth?.loggedIn as typeLoggedIn
  const onSubmit = handleSubmit(async (data) => {
    if (data.fullName === fullName && data.email === email) {
      setErrorData("You have not changed the data")
      return
    }
    try {
      const res = await axios.post("/user/updateUser", {
        userId: _id,
        fullName: data.fullName,
        email: data.email,
      })
      if (res.data.error) {
        errorToast(res.data.error)
        return
      }
      const { message, ...rest } = res.data
      auth?.logIn(rest)
      successToast(message)
    } catch (e) {
      console.log(e)
    }
  })
  return (
    <div>
      <div>
        <h2 className="home-title">My profile</h2>
      </div>
      <div>
        <div>
          <p>
            <b>My role: </b>
            {role}
          </p>
        </div>
        <Form onSubmit={onSubmit}>
          <div className="field-form">
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
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Email</Form.Label>
              <Form.Control
                size="sm"
                type="email"
                defaultValue={email}
                {...register("email", {
                  validate: {
                    value: (v) => EMAIL_REGEXP.test(v) || "Invalid e-mail",
                  },
                })}
              />
              {errors.email != null && <span className="danger">{errors.email.message}</span>}
            </Form.Group>
          </div>
          <div className="form-span-button">
            {errorData && <span className="danger">{errorData}</span>}
            <button className="M-btn btn-green center" onClick={onSubmit}>
              Edit profile
            </button>
          </div>
        </Form>
      </div>
    </div>
  )
}
