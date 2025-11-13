export const calculateSalesMetrics = (filteredOrders) => {
    const totalSales = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    
    const salesByPayment = filteredOrders.reduce((acc, order) => {
      acc[order.payment] = (acc[order.payment] || 0) + order.total;
      return acc;
    }, {});

    const salesByProduct = {};
    filteredOrders.forEach(order => {
      order.items.forEach(item => {
        const name = item.product.name;
        const amount = item.quantity * item.product.price;
        if (!salesByProduct[name]) {
          salesByProduct[name] = { total: 0, count: 0 };
        }
        salesByProduct[name].total += amount;
        salesByProduct[name].count += item.quantity;
      });
    });
  
    const salesByHour = filteredOrders.reduce((acc, order) => {
      const date = new Date(order.createdAt);
      const hour = date.getHours();
      const timeKey = `${hour.toString().padStart(2, '0')}:00`;
      
      if (!acc[timeKey]) {
        acc[timeKey] = { total: 0, count: 0 };
      }
      acc[timeKey].total += order.total;
      acc[timeKey].count += 1;
      return acc;
    }, {});
  
    return {
      totalSales,
      salesByPayment,
      salesByProduct,
      salesByHour
    };
  };