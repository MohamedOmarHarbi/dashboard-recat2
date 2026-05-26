export const customers = [
  {
    id: 1,
    name: "Ahmed Hassan",
    phone: "01098765432",
    email: "ahmed@email.com",
    orders: 12,
    totalSpent: 2450,
    status: "Active",
    joinedAt: "2024-08-12",
    addresses: [
      { id: 1, type: "Home", city: "Cairo", street: "9th Street, Maadi" },
      { id: 2, type: "Work", city: "Giza", street: "Smart Village, Building B4" }
    ],
    orderHistory: [
      { id: "#ORD-101", date: "2024-08-15", amount: 250, status: "Delivered" },
      { id: "#ORD-105", date: "2024-08-20", amount: 400, status: "Delivered" }
    ]
  },
  {
    id: 2,
    name: "Sarah Ali",
    phone: "01122334455",
    email: "sarah@email.com",
    orders: 8,
    totalSpent: 1800,
    status: "Active",
    joinedAt: "2024-09-05",
    addresses: [
      { id: 3, type: "Home", city: "Alexandria", street: "Corniche St" }
    ],
    orderHistory: [
      { id: "#ORD-202", date: "2024-09-10", amount: 150, status: "Processing" }
    ]
  },
  {
    id: 3,
    name: "John Doe",
    phone: "01233445566",
    email: "john@email.com",
    orders: 0,
    totalSpent: 0,
    status: "Blocked",
    joinedAt: "2024-10-01",
    addresses: [],
    orderHistory: []
  }
];
