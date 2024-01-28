export const updateOrderStage = (orderId, newStage) => ({
    type: 'UPDATE_ORDER_STAGE',
    payload: { orderId, newStage },
  });
  

export  const removeOrder = (orderId) => ({
    type: 'REMOVE_ORDER',
    payload: orderId,
  });