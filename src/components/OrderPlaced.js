// OrderForm.js
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderForm = () => {
  const [order, setOrder] = useState({
    type: 'Veg',
    size: 'Large',
    base: 'Thin',
    numberOfOrders: 1,
  });

  const [orders, setOrders] = useState([]);
  const maxOrders = 10;

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleNumberOfOrdersChange = (e) => {
    const newNumberOfOrders = parseInt(e.target.value, 10);
    setOrder((prevOrder) => ({
      ...prevOrder,
      numberOfOrders: isNaN(newNumberOfOrders) ? 1 : Math.min(newNumberOfOrders, maxOrders),
    }));
  };

  const placeOrder = () => {
    if (order.numberOfOrders <= 0) {
      alert('Number of orders should be greater than 0');
      return;
    }

    if (orders.length + order.numberOfOrders <= maxOrders) {
      for (let i = 0; i < order.numberOfOrders; i++) {
        const orderId = generateOrderId();
        setOrders((prevOrders) => [
          ...prevOrders,
          { ...order, stage: 'Order Placed', id: orderId },
        ]);
      }
      setOrder({ type: 'Veg', size: 'Large', base: 'Thin', numberOfOrders: 1 });

      // Show toast message
      toast.success('Order(s) placed successfully!', {
        position: 'bottom-right',
      });
    } else {
      alert('Exceeding the maximum limit of orders');
    }
  };

  const generateOrderId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="order-form">
      <h2>Place an Order</h2>
      <label>
        Type:
        <select name="type" value={order.type} onChange={handleOrderChange} id="typeSelect">
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
      </label>
      <br />

      <label>
        Size:
        <select name="size" value={order.size} onChange={handleOrderChange} id="sizeSelect">
          <option value="Large">Large</option>
          <option value="Medium">Medium</option>
          <option value="Small">Small</option>
        </select>
      </label>
      <br />

      <label>
        Base:
        <select name="base" value={order.base} onChange={handleOrderChange} id="baseSelect">
          <option value="Thin">Thin</option>
          <option value="Thick">Thick</option>
        </select>
      </label>
      <br />

      <label>
        Number of Orders:
        <input
          type="number"
          value={order.numberOfOrders}
          onChange={handleNumberOfOrdersChange}
          min="1"
          max={maxOrders}
        />
      </label>
      <br />

      <button type="button" onClick={placeOrder} className="place-order-btn">
        Place Order
      </button>

      {/* Toast Container for displaying messages */}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default OrderForm;
