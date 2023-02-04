export const initialState = {
    image: '',
    listProduct: [],
  };
  
  export const ProductReducer = (state, action) => {
    switch (action.type) {
      case 'setImage':
        return {...state, image: action.payload.image};
        break;
      case 'setProduct':
        return {...state, listProduct: [...action.payload.product]};
        break;
      default:
        return state;
    }
  };
  