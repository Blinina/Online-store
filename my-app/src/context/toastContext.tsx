import { createContext, ReactNode, useContext } from "react"
import { toast, ToastContainer } from "react-toastify"

interface TypeToastContent {
  successToast: (data: string) => void
  errorToast: (data: string) => void
}

const ToastifyContext = createContext<TypeToastContent>({
  successToast: function (data: string): void {
    throw new Error("Function not implemented.")
  },
  errorToast: function (data: string): void {
    throw new Error("Function not implemented.")
  },
})

export function ToastifyProvider({ children }: { children: ReactNode }) {
  const successToast = (message: string) => toast.success(message)
  const errorToast = (message: string) => toast.error(message)
  return (
    <ToastifyContext.Provider value={{ successToast, errorToast }}>
      <ToastContainer />
      {children}
    </ToastifyContext.Provider>
  )
}

export const useToastify = () => useContext(ToastifyContext)
