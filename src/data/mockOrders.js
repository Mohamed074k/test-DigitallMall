export const mockOrders = [
  {
    id: "ORD-001",
    userId: 1,
    userName: "John Smith",
    userEmail: "john.smith@email.com",
    userAvatar: "https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=JS",
    brandId: 1,
    brandName: "Nike",
    brandLogo: "https://via.placeholder.com/40x40/000000/FFFFFF?text=N",
    orderDate: "2024-03-15",
    totalAmount: 299.99,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    paymentReference: "TXN-CC-2024-001",
    shippingStatus: "Delivered",
    shippingAddress: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    items: [
      {
        id: 1,
        name: "Product 1",
        quantity: 1,
        price: 149.99,
        image: "https://via.placeholder.com/60x60/3B82F6/FFFFFF?text=NM"
      },
      {
        id: 2,
        name: "Product 2",
        quantity: 1,
        price: 150.00,
        image: "https://via.placeholder.com/60x60/10B981/FFFFFF?text=NT"
      }
    ],
    trackingNumber: "TRK-123456789",
    estimatedDelivery: "2024-03-20",
    actualDelivery: "2024-03-18",
    notes: "Customer requested early delivery"
  },
  {
    id: "ORD-002",
    userId: 2,
    userName: "Sarah Johnson",
    userEmail: "sarah.johnson@email.com",
    userAvatar: "https://via.placeholder.com/40x40/10B981/FFFFFF?text=SJ",
    brandId: 2,
    brandName: "Adidas",
    brandLogo: "https://via.placeholder.com/40x40/000000/FFFFFF?text=A",
    orderDate: "2024-03-16",
    totalAmount: 189.50,
    paymentStatus: "COD",
    paymentMethod: "Cash on Delivery",
    paymentReference: null,
    shippingStatus: "Pending",
    shippingAddress: {
      street: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "USA"
    },
    items: [
      {
        id: 3,
        name: "Product 3",
        quantity: 1,
        price: 189.50,
        image: "https://via.placeholder.com/60x60/EF4444/FFFFFF?text=AU"
      }
    ],
    trackingNumber: null,
    estimatedDelivery: "2024-03-25",
    actualDelivery: null,
    notes: "Customer prefers weekend delivery"
  },
  {
    id: "ORD-003",
    userId: 4,
    userName: "Emily Davis",
    userEmail: "emily.davis@email.com",
    userAvatar: "https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=ED",
    brandId: 6,
    brandName: "Sony",
    brandLogo: "https://via.placeholder.com/40x40/000000/FFFFFF?text=S",
    orderDate: "2024-03-14",
    totalAmount: 899.99,
    paymentStatus: "Pending",
    paymentMethod: "Bank Transfer",
    paymentReference: null,
    shippingStatus: "Processing",
    shippingAddress: {
      street: "789 Pine Street",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
      country: "USA"
    },
    items: [
      {
        id: 4,
        name: "Product 4",
        quantity: 1,
        price: 899.99,
        image: "https://via.placeholder.com/60x60/06B6D4/FFFFFF?text=SH"
      }
    ],
    trackingNumber: "TRK-987654321",
    estimatedDelivery: "2024-03-22",
    actualDelivery: null,
    notes: "Payment verification in progress"
  },
  {
    id: "ORD-004",
    userId: 7,
    userName: "Robert Taylor",
    userEmail: "robert.taylor@email.com",
    userAvatar: "https://via.placeholder.com/40x40/84CC16/FFFFFF?text=RT",
    brandId: 8,
    brandName: "Canon",
    brandLogo: "https://via.placeholder.com/40x40/000000/FFFFFF?text=C",
    orderDate: "2024-03-13",
    totalAmount: 1299.99,
    paymentStatus: "Paid",
    paymentMethod: "PayPal",
    paymentReference: "TXN-PP-2024-004",
    shippingStatus: "Shipped",
    shippingAddress: {
      street: "321 Elm Street",
      city: "Denver",
      state: "CO",
      zipCode: "80202",
      country: "USA"
    },
    items: [
      {
        id: 5,
        name: "Product 5",
        quantity: 1,
        price: 1299.99,
        image: "https://via.placeholder.com/60x60/F59E0B/FFFFFF?text=CE"
      }
    ],
    trackingNumber: "TRK-456789123",
    estimatedDelivery: "2024-03-21",
    actualDelivery: null,
    notes: "Fragile item - handle with care"
  },
  {
    id: "ORD-005",
    userId: 5,
    userName: "David Wilson",
    userEmail: "david.wilson@email.com",
    userAvatar: "https://via.placeholder.com/40x40/EF4444/FFFFFF?text=DW",
    brandId: 1,
    brandName: "Nike",
    brandLogo: "https://via.placeholder.com/40x40/000000/FFFFFF?text=N",
    orderDate: "2024-03-12",
    totalAmount: 89.99,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    paymentReference: "TXN-CC-2024-005",
    shippingStatus: "Cancelled",
    shippingAddress: {
      street: "654 Maple Drive",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "USA"
    },
    items: [
      {
        id: 6,
        name: "Product 6",
        quantity: 1,
        price: 89.99,
        image: "https://via.placeholder.com/60x40/6366F1/FFFFFF?text=NR"
      }
    ],
    trackingNumber: null,
    estimatedDelivery: "2024-03-19",
    actualDelivery: null,
    notes: "Customer cancelled due to size issue"
  },
  {
    id: "ORD-006",
    userId: 9,
    userName: "Christopher Lee",
    userEmail: "christopher.lee@email.com",
    userAvatar: "https://via.placeholder.com/40x40/EC4899/FFFFFF?text=CL",
    brandId: 2,
    brandName: "Adidas",
    brandLogo: "https://via.placeholder.com/40x40/000000/FFFFFF?text=A",
    orderDate: "2024-03-17",
    totalAmount: 245.00,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    paymentReference: "TXN-CC-2024-006",
    shippingStatus: "Delivered",
    shippingAddress: {
      street: "987 Cedar Lane",
      city: "Austin",
      state: "TX",
      zipCode: "73301",
      country: "USA"
    },
    items: [
      {
        id: 7,
        name: "Product 7",
        quantity: 1,
        price: 125.00,
        image: "https://via.placeholder.com/60x60/8B5CF6/FFFFFF?text=AT"
      },
      {
        id: 8,
        name: "Product 8",
        quantity: 1,
        price: 120.00,
        image: "https://via.placeholder.com/60x60/F97316/FFFFFF?text=AP"
      }
    ],
    trackingNumber: "TRK-789123456",
    estimatedDelivery: "2024-03-24",
    actualDelivery: "2024-03-22",
    notes: "Delivered to front desk"
  },
  {
    id: "ORD-007",
    userId: 8,
    userName: "Jennifer Martinez",
    userEmail: "jennifer.martinez@email.com",
    userAvatar: "https://via.placeholder.com/40x40/F97316/FFFFFF?text=JM",
    brandId: 6,
    brandName: "Sony",
    brandLogo: "https://via.placeholder.com/40x40/000000/FFFFFF?text=S",
    orderDate: "2024-03-18",
    totalAmount: 599.99,
    paymentStatus: "Pending",
    paymentMethod: "Bank Transfer",
    paymentReference: null,
    shippingStatus: "Processing",
    shippingAddress: {
      street: "147 Birch Road",
      city: "Phoenix",
      state: "AZ",
      zipCode: "85001",
      country: "USA"
    },
    items: [
      {
        id: 9,
        name: "Product 9",
        quantity: 1,
        price: 599.99,
        image: "https://via.placeholder.com/60x60/10B981/FFFFFF?text=SE"
      }
    ],
    trackingNumber: null,
    estimatedDelivery: "2024-03-26",
    actualDelivery: null,
    notes: "Awaiting payment confirmation"
  },
  {
    id: "ORD-008",
    userId: 3,
    userName: "Michael Brown",
    userEmail: "michael.brown@email.com",
    userAvatar: "https://via.placeholder.com/40x40/F59E0B/FFFFFF?text=MB",
    brandId: 1,
    brandName: "Nike",
    brandLogo: "https://via.placeholder.com/40x40/000000/FFFFFF?text=N",
    orderDate: "2024-03-11",
    totalAmount: 199.98,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    paymentReference: "TXN-CC-2024-008",
    shippingStatus: "Delivered",
    shippingAddress: {
      street: "258 Spruce Street",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA"
    },
    items: [
      {
        id: 10,
        name: "Product 10",
        quantity: 2,
        price: 99.99,
        image: "https://via.placeholder.com/60x60/EF4444/FFFFFF?text=NB"
      }
    ],
    trackingNumber: "TRK-321654987",
    estimatedDelivery: "2024-03-18",
    actualDelivery: "2024-03-16",
    notes: "Customer satisfied with delivery"
  }
];
