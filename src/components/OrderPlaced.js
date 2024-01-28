import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector  } from 'react-redux';

const OrderForm = () => {
  const dispatch = useDispatch();
  const [orderIdCounter, setOrderIdCounter] = useState(1);
  const [order, setOrder] = useState({
    type: 'Veg',
    size: 'Large',
    base: 'Thin',
    numberOfOrders: 1,
    stage: 'Order Placed',
    timestamp: new Date().toISOString(),
  });

  const [orders, setOrders] = useState([]);
  const maxOrders = 10;

  useEffect(() => {
    setOrderIdCounter(1);
  }, []);

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
    if (!toast.isActive('max-orders-error')) {
      if (orders.length + order.numberOfOrders <= maxOrders) {
        const newOrders = [];
        for (let i = 0; i < order.numberOfOrders; i++) {
          const orderId = `00${orderIdCounter}`.slice(-3);
          const timestamp = new Date().toISOString();
          newOrders.push({ ...order, id: uuidv4(), timestamp });
        }
  
        dispatch({ type: 'ADD_ORDERS', payload: newOrders });
  
        setOrderIdCounter((prevCounter) => prevCounter + 1);
  
        setOrder({
          type: 'Veg',
          size: 'Large',
          base: 'Thin',
          numberOfOrders: 1,
          stage: 'Order Placed',
          timestamp: new Date().toISOString(),
        });
  
        toast.dismiss();
  
        const totalOrders = orders.length + order.numberOfOrders;  

        toast.success(`order placed successfully!`, {
          position: 'bottom-right',
        });

      } else {
        toast.error('Not taking any order for now!', {
          position: 'bottom-right',
          toastId: 'max-orders-error',
        });
      }
    }
  };
  

  return (
    <>
      <div className="order-form">
        <h2 id="form-heading">Place an Order</h2>
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
            id="orderSelect"
          />
        </label>
        <br />

        {((useSelector((state) => state.orders).length)>=10)?<p id='error'>Not taking orders for now</p>:null}

        <button type="button" onClick={((useSelector((state) => state.orders).length)<=10)?placeOrder:null} className="place-order-btn">
          Place Order
        </button>

        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
};

export default OrderForm;
