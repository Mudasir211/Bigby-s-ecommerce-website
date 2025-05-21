import { nanoid } from 'nanoid'
import { createSlice,configureStore,} from "@reduxjs/toolkit"; 



export const newSlice = createSlice({
    name : "Slice",
    initialState :{items:JSON.parse(sessionStorage.getItem("items")) || [],orderItem : JSON.parse(sessionStorage.getItem("orderItem")) || {}},
    reducers :{
        setCart(state, action) {
            state.items = action.payload;
          },
          updateItemQuantity(state, action) {
            const { itemId, quantity } = action.payload;

            const item = state.items.find(item => item._id === itemId);
            if (item && quantity>0) item.quantity = quantity;
          },
          removeItem(state, action) {
            state.items = state.items.filter(item => item._id !== action.payload);
          },
          addItem(state, action) {
            const itemExists = state.items.find(
                (item) => item.productId === action.payload.productId && item.size === action.payload.size
              );
              if (itemExists) {
                itemExists.quantity += 1;}else{
                    state.items.push(action.payload);

                }
                
          },addOrderItem(state, action) {
            
            state.orderItem = {}    
            state.orderItem = action.payload
          },
         incrementOrderQuantity(state,){
           state.orderItem.quantity++
         },decrementOrderQuantity(state,){
           state.orderItem.quantity>1 && state.orderItem.quantity--
         }
    }})
    
    export const actions = newSlice.actions
