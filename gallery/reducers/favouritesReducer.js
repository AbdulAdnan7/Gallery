const favouriteReducer = (state, action) => {
    switch(action.type) {
        case "TOGGLE_FAVOURITE":
            {/** this if condition check if there's already that photo added as favourite or not if added it will remove it */}
            if(state.includes(action.payload)) {
                return state.filter((id) => id !== action.payload)
            }
            
            {/** to add in favorites */}
            return [...state, action.payload]
    
            {/**For default state */ }
           default: 
           return state
        }
}

export default favouriteReducer