import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrderStage } from '../Redux/Actions';
import moment from 'moment';

const TrackOrder = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const [timers, setTimers] = useState({});

  useEffect(() => {
    const orderTimers = {};
    orders.forEach((order) => {
      orderTimers[order.id] = startTimer(order.id);
    });
    setTimers(orderTimers);

    return () => {
      Object.values(orderTimers).forEach((timer) => clearInterval(timer));
    };
  }, [orders]);

  const startTimer = (orderId) => {
    return setInterval(() => {
      dispatch(updateOrderStage(orderId, null, new Date().toISOString()));
    }, 1000);
  };

  const moveToNextStage = (orderId) => {
    clearInterval(timers[orderId]);

    const orderIndex = orders.findIndex((order) => order.id === orderId);
    if (orderIndex !== -1) {
      const nextColumn =
        orders[orderIndex].stage === 'Order Placed'
          ? 'Order In Making'
          : orders[orderIndex].stage === 'Order In Making'
          ? 'Order Ready'
          : 'Order Picked';

      dispatch(updateOrderStage(orderId, nextColumn));
    }
  };

  const renderOrders = (stage) => {
    const ordersForStage = orders.filter((order) => order.stage === stage);

    return (
      <div>
        <h2 id="order-stage-heading">{stage}</h2>
        {ordersForStage.map((order) => (
          <div
            key={order.id}
            className={`order-box ${shouldHighlightRed(order.timestamp) ? 'highlight-red' : ''}`}
          >
            <p>Order ID: {order.id}</p>
            <p>{getFormattedTimer(order.timestamp, stage)}</p>
            <button onClick={() => moveToNextStage(order.id)}>Next</button>
          </div>
        ))}
      </div>
    );
  };

  const shouldHighlightRed = (timestamp) => {
    const currentTime = new Date();
    const orderTime = new Date(timestamp);
    const duration = moment.duration(currentTime - orderTime);

    return duration.asMinutes() > 3;
  };

  const getFormattedTimer = (timestamp, stage) => {
    if (stage === 'Order Picked') {
      return 'Order Picked';
    }

    const currentTime = new Date();
    const orderTime = new Date(timestamp);
    const duration = moment.duration(currentTime - orderTime);

    const hours = Math.floor(duration.asHours());
    const minutes = moment.utc(duration.asMilliseconds()).format('mm');
    const seconds = moment.utc(duration.asMilliseconds()).format('ss');

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="track-order-container">
      <div className="order-column">{renderOrders('Order Placed')}</div>
      <div className="order-column">{renderOrders('Order In Making')}</div>
      <div className="order-column">{renderOrders('Order Ready')}</div>
      <div className="order-column">{renderOrders('Order Picked')}</div>
    </div>
  );
};

export default TrackOrder;
