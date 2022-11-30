
export const initState = {
    balance: 0,
    privateKey: '',
}

export const transactionReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_BALANCE':
            return {
                ...state,
                balance: action.payload
            }
        
        case 'SET_PRIVATE-KEY':
            return{
                ...state,
                privateKey: action.payload
            }
    
        default:
            return state;
    }
}