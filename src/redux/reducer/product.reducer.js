import * as ActionTypes from '../ActionTypes';

const initialValues = {
    products: [],
    product_img: [],
    errorMsg: '',
    isLoading: false
}

const productsReducer = (state = initialValues, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                errorMsg: '',
                isLoading: false
            }
        case ActionTypes.ADD_PRODUCTS:
            return {
                ...state,
                products: state.products.concat(action.payload),
                errorMsg: '',
                isLoading: false
            }
        case ActionTypes.DELETE_PRODUCTS:
            return {
                ...state,
                products: state.products.filter((m) => m.id !== action.payload),
                errorMsg: '',
                isLoading: false
            }
        case ActionTypes.UPDATE_PRODUCTS:
            return {
                ...state,
                products: state.products.map((m) => {
                    if (m.id !== action.payload.id) {
                        return action.payload
                    } else {
                        return m
                    }
                }),
                errorMsg: '',
                isLoading: false
            }
        default:
            return state;
    }
}

export default productsReducer;