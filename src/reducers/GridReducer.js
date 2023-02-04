export const initialState = {
    widthGrid: '',
    heightGrid: '',
    paddingGrid: '',
    topGrid: '',
    sizeFont: '',
    marginFont: '',
  };
  
  export const GridReducer = (state, action) => {
    switch (action.type) {
      case 'setWidth':
        return {...state, widthGrid: action.payload.width};
        break;
      case 'setHeight':
        return {...state, heightGrid: action.payload.height};
        break;
      case 'setPadding':
        return {...state, paddingGrid: action.payload.padding};
        break;
      case 'setTop':
        return {...state, topGrid: action.payload.top};
        break;
      case 'setSize':
        return {...state, sizeFont: action.payload.size};
        break;
      case 'setMargin':
        return {...state, marginFont: action.payload.margin};
        break;
      default:
        return state;
    }
  };
  