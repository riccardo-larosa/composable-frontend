import React, { createContext, ReactNode, useEffect, useReducer } from "react"
import {
  Cart,
  CartIncluded,
  ResourceIncluded,
  Moltin as EPCCClient
} from "@moltin/sdk"
import { CartAction, CartState } from "./types/cart-reducer-types"
import { cartReducer } from "./cart-reducer"
import { getCart } from "./service/cart"
import { getInitialState } from "./util/get-initial-cart-state"
import { StoreEvent } from "@lib/shared"

export const CartItemsContext = createContext<
  | {
      state: CartState
      dispatch: (action: CartAction) => void
      resolveCartId: () => string
      client: EPCCClient
      emit?: (event: StoreEvent) => void
    }
  | undefined
>(undefined)

export interface CartProviderProps {
  children: ReactNode
  client: EPCCClient
  resolveCartId: () => string
  cart?: ResourceIncluded<Cart, CartIncluded>
  emit?: (event: StoreEvent) => void
}

export function CartProvider({
  cart,
  children,
  emit,
  resolveCartId,
  client
}: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, getInitialState(cart))

  useEffect(() => {
    if (state.kind === "uninitialised-cart-state") {
      _initialiseCart(dispatch, resolveCartId, client, emit)
    }
  }, [state, dispatch, emit])

  return (
    <CartItemsContext.Provider
      value={{ state, dispatch, emit, resolveCartId, client }}
    >
      {children}
    </CartItemsContext.Provider>
  )
}

async function _initialiseCart(
  dispatch: (action: CartAction) => void,
  resolveCartId: () => string,
  client: EPCCClient,
  emit?: (event: StoreEvent) => void
) {
  const cartId = resolveCartId()

  dispatch({
    type: "initialise-cart"
  })

  const resp = await getCart(cartId, client)

  dispatch({
    type: "update-cart",
    payload: {
      id: resp.data.id,
      meta: resp.data.meta,
      items: resp.included?.items ?? []
    }
  })

  if (emit) {
    emit({
      type: "success",
      scope: "cart",
      action: "init",
      message: "Initialised cart"
    })
  }
}

// import React, { createContext, ReactNode, useEffect, useReducer } from "react"
// import { Cart, CartIncluded, ResourceIncluded } from "@moltin/sdk"
// import { CartAction, CartState } from "./types/cart-reducer-types"
// import { cartReducer } from "./cart-reducer"
// // import { getCart } from "../services/cart";
// // import { getCartCookie } from "../lib/cart-cookie";
// import { getInitialState } from "./util/get-initial-cart-state"
// import { StoreEvent } from "../types/event-types"
//
// export const CartItemsContext = createContext<
//   | {
//       state: CartState
//       dispatch: (action: CartAction) => void
//       emit?: (event: StoreEvent) => void
//     }
//   | undefined
// >(undefined)
//
// interface CartProviderProps {
//   cart?: ResourceIncluded<Cart, CartIncluded>
//   emit?: (event: StoreEvent) => void
//   children: ReactNode
// }
//
// export function CartProvider({ cart, children, emit }: CartProviderProps) {
//   const [state, dispatch] = useReducer(cartReducer, getInitialState(cart))
//
//   useEffect(() => {
//     if (state.kind === "uninitialised-cart-state") {
//       _initialiseCart(dispatch, emit)
//     }
//   }, [state, dispatch, emit])
//
//   return (
//     <CartItemsContext.Provider value={{ state, dispatch, emit }}>
//       {children}
//     </CartItemsContext.Provider>
//   )
// }
//
// async function _initialiseCart(
//   dispatch: (action: CartAction) => void,
//   emit?: (event: StoreEvent) => void
// ) {
//   const cartId = "123" //getCartCookie()
//
//   dispatch({
//     type: "initialise-cart"
//   })
//
//   const resp: any = {} //await getCart(cartId)
//
//   dispatch({
//     type: "update-cart",
//     payload: {
//       id: resp.data.id,
//       meta: resp.data.meta,
//       items: resp.included?.items ?? []
//     }
//   })
//
//   if (emit) {
//     emit({
//       type: "success",
//       scope: "cart",
//       action: "init",
//       message: "Initialised cart"
//     })
//   }
// }