import { ThunkAction } from '@reduxjs/toolkit'
import 'redux'

export interface Product {
  __v?: number
  _id: string
  title: string
  price: number
  description: string
  category: string
  type: string
  image: string[]
  rating: number
  newColection: boolean
  sales: {
    sales: boolean
    count: number
  }
}

declare module 'redux' {

  function bindActionCreators<
        ActionCreators extends ActionCreatorsMapObject<any>
    > (
    actionCreators: ActionCreators,
    dispatch: Dispatch
  ): {
    [ActionCreatorName in keyof ActionCreators]: ReturnType<
    ActionCreators[ActionCreatorName]
    > extends ThunkAction<any, any, any, any>
      ? (
          ...args: Parameters<ActionCreators[ActionCreatorName]>
        ) => ReturnType<ReturnType<ActionCreators[ActionCreatorName]>>
      : ActionCreators[ActionCreatorName]
  }

  export type DispatchInterface<A extends Action = AnyAction> = <ReturnType = any, State = any, ExtraThunkArg = any>(
      thunkAction: ThunkAction<ReturnType, State, ExtraThunkArg, A>
    ) => ReturnType
}
