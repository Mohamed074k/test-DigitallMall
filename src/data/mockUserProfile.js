// src/data/mockUserProfile.js
import placeholder from "../assets/images/placeholder.png";

const mockUserProfile = {
  id: 1,
  name: "’Mohamed Elsayed",
  email: "the.real.mohamed074@gmail.com",
  joiningDate: "March 2022",
  profilePicture: placeholder,
  password: "12345678",
  phoneNumber: "+20 1228563612",
  dateOfBirth: "2005-2-7",
  gender: "Male",
  address: {
    street: "123 Main Street",
    city: "Cairo",
    country: "Egypt",
    zipCode: "11511"
  },
  preferences: {
    newsletter: true,
    promotions: false,
    notifications: true
  },
  statistics: {
    orders: 12,
    favorites: 8,
    followingBrands: 5,
    followingModels: 3,
    totalSpent: 2450.75
  },
  socialLinks: {
    facebook: "ahmed.hassan",
    instagram: "ahmed_hassan",
    twitter: "ahmed_hassan"
  },
  lastLogin: "2023-12-15T14:30:00Z",
  accountStatus: "Active",
  membershipTier: "Gold",
  loyaltyPoints: 1250
};

export const mockFollowingBrands = [
  {
    id: 1,
    name: "Nike",
    image: placeholder,
    followers: 1250000,
    slug: "nike"
  },
  {
    id: 2,
    name: "Adidas",
    image: placeholder,
    followers: 980000,
    slug: "adidas"
  },
  {
    id: 3,
    name: "Zara",
    image: placeholder,
    followers: 750000,
    slug: "zara"
  },
  {
    id: 4,
    name: "H&M",
    image: placeholder,
    followers: 620000,
    slug: "hm"
  },
  {
    id: 5,
    name: "Gucci",
    image: placeholder,
    followers: 450000,
    slug: "gucci"
  }
];

export const mockFollowingModels = [
  {
    id: 1,
    name: "Amira Khalil",
    image: placeholder,
    followers: 125000,
    slug: "amira-khalil"
  },
  {
    id: 2,
    name: "Karim Mahmoud",
    image: placeholder,
    followers: 98000,
    slug: "karim-mahmoud"
  },
  {
    id: 3,
    name: "Layla Hassan",
    image: placeholder,
    followers: 75000,
    slug: "layla-hassan"
  }
];

export const mockOrderHistory = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 89.97,
    items: [
      { name: 'Essential Tag Tee Black', quantity: 1, price: 29.99 },
      { name: 'Essential Sweatshirt Grey', quantity: 1, price: 49.99 },
      { name: 'Essential Tag Dad Hat Black', quantity: 1, price: 24.99 }
    ]
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    status: 'Shipped',
    total: 79.98,
    items: [
      { name: 'Essential Tag Tee White', quantity: 2, price: 39.99 }
    ]
  },
  {
    id: 'ORD-003',
    date: '2024-01-05',
    status: 'Delivered',
    total: 49.99,
    items: [
      { name: 'Essential Sweatshirt Black', quantity: 1, price: 49.99 }
    ]
  }
];

export default mockUserProfile;