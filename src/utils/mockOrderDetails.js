export const orderDetails = {
  "#ORD-10234": {
    id: "#ORD-10234",
    customerName: "Ahmed Ali",
    email: "ahmed@email.com",
    phone: "+20123456789",
    address: "Cairo, Egypt",
    paymentMethod: "Credit Card",
    status: "Delivered",
    total: "$120.00",
    items: [
      { name: "Wireless Headphones", quantity: 1, price: "$80" },
      { name: "Phone Case", quantity: 2, price: "$20" }
    ]
  },
  "#ORD-10235": {
    id: "#ORD-10235",
    customerName: "Sarah Mohamed",
    email: "sarah@email.com",
    phone: "+20109876543",
    address: "Alexandria, Egypt",
    paymentMethod: "PayPal",
    status: "Pending",
    total: "$85.50",
    items: [
      { name: "USB-C Hub", quantity: 1, price: "$45.50" },
      { name: "Mouse Pad", quantity: 2, price: "$20" }
    ]
  }
};

// Fallback for others since I only have 12 records in ordersList
export const getOrderDetails = (orderId) => {
  return orderDetails[orderId] || {
    id: orderId,
    customerName: "Customer Name",
    email: "customer@email.com",
    phone: "+20111222333",
    address: "Giza, Egypt",
    paymentMethod: "Cash on Delivery",
    status: "Processing",
    total: "$100.00",
    items: [
      { name: "Generic Product", quantity: 1, price: "$100" }
    ]
  };
};
