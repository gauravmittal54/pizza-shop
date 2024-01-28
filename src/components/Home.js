import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { removeOrder } from '../Redux/Actions';

const OrderTable = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.slice(1)); 

  const getFormattedTimer = (timestamp) => {
    const currentTime = new Date();
    const orderTime = new Date(timestamp);
    const duration = moment.duration(currentTime - orderTime);

    const hours = Math.floor(duration.asHours());
    const minutes = moment.utc(duration.asMilliseconds()).format('mm');
    const seconds = moment.utc(duration.asMilliseconds()).format('ss');

    return `${hours}:${minutes}:${seconds}`;
  };

  const handleCancelOrder = (orderId) => {
    dispatch(removeOrder(orderId));
  };

  return (
    <div className="table-container">
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Stage</th>
            <th>Total Time Spent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.stage}</td>
              <td>{getFormattedTimer(order.timestamp)}</td>
              <td>
                {['Order Placed', 'Order In Making'].includes(order.stage) && (
                  <button onClick={() => handleCancelOrder(order.id)}>Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
