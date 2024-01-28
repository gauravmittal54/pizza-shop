const initialState = {
  orders: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ORDERS':
      return {
        ...state,
        orders: [...state.orders, ...action.payload],
      };
    case 'UPDATE_ORDER_STAGE':
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId ? { ...order, stage: action.payload.newStage } : order
        ),
      };
    case 'REMOVE_ORDER':
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };
    default:
      return state;
  }
};

export default rootReducer;
