export const initialState = {
  id: '',
  shop: '',
  department: '',
  externalShop: '',
};

export const ShopDepartmentReducer = (state, action) => {
  switch (action.type) {
    case 'setShop':
      return {...state, shop: action.payload.shop};
      break;
    case 'setDepartment':
      return {...state, department: action.payload.department};
      break;
    case 'setId':
      return {...state, id: action.payload.id};
      break;
    case 'setExternalShop':
      return {...state, externalShop: action.payload.externalShop};
      break;

    default:
      return state;
  }
};
