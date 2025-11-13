import { useState, useEffect } from 'react';
import { getOrders } from '../../../services/api';

export const useSalesData = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const filterOrders = () => {
    if (!selectedDate) return;
    
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    const filtered = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startOfDay && orderDate <= endOfDay;
    });
    
    setFilteredOrders(filtered);
    setHasSearched(true);
  };

  return {
    orders,
    filteredOrders,
    selectedDate,
    hasSearched,
    setSelectedDate,
    filterOrders
  };
};