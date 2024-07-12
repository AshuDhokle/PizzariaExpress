import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    pizzas : [],
}

const pizzaSlice = createSlice({
    name:'pizzas',
    initialState,
    reducers:{
        addPizzas: (state,actions)=>{
            const currPizzaList = actions.payload;
            console.log(currPizzaList);
            state.pizzas = currPizzaList; 
          //  console.log(state.pizzas);
        },
        filterPizzas: (state,actions)=>{
            let filteredPizzaList;
            if(actions.payload === 'Veg')
                filteredPizzaList = state.pizzas.filter((item) => {item.veg === true;})
            else if(actions.payload === 'Non-Veg')
                filteredPizzaList = state.pizzas.filter((item) => {item.veg === false;})
            else
                filteredPizzaList = state.pizzas
            state.pizzas = filteredPizzaList;

        }
    }
})


export const {addPizzas,filterPizzas} = pizzaSlice.actions

export const selectPizzas = (state) => state.pizzas;

export default pizzaSlice.reducer