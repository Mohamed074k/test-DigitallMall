import React, { createContext, useState, useEffect } from 'react';

// Create the DesignerContext
export const DesignerContext = createContext();

// Sample data for designers (replace with actual API calls in a real application)
const initialDesigners = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'Active',
    assignedRequests: 15,
    earnings: 1500.75,
    requestsHandled: 50,
    customerRating: 4.8,
    email: 'john.doe@example.com',
    location: 'New York, USA',
    joinDate: '2023-01-15',
    lastLogin: '2025-08-30'
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    status: 'Pending',
    assignedRequests: 5,
    earnings: 300.20,
    requestsHandled: 10,
    customerRating: 4.2,
    email: 'jane.smith@example.com',
    location: 'London, UK',
    joinDate: '2024-03-10',
    lastLogin: '2025-08-29'
  }
];

// DesignerContext Provider
export const DesignerProvider = ({ children }) => {
  const [designers, setDesigners] = useState(initialDesigners);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulate fetching designers (replace with actual API call)
  useEffect(() => {
    setLoading(true);
    try {
      // Simulate API delay
      setTimeout(() => {
        setDesigners(initialDesigners);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to fetch designers');
      setLoading(false);
    }
  }, []);

  // Actions
  const approveDesigner = async (id) => {
    setDesigners(prev =>
      prev.map(designer =>
        designer.id === id ? { ...designer, status: 'Active' } : designer
      )
    );
  };

  const rejectDesigner = async (id) => {
    setDesigners(prev =>
      prev.map(designer =>
        designer.id === id ? { ...designer, status: 'Rejected' } : designer
      )
    );
  };

  const suspendDesigner = async (id) => {
    setDesigners(prev =>
      prev.map(designer =>
        designer.id === id ? { ...designer, status: 'Suspended' } : designer
      )
    );
  };

  const deleteDesigner = async (id) => {
    setDesigners(prev => prev.filter(designer => designer.id !== id));
  };

  return (
    <DesignerContext.Provider
      value={{
        designers,
        loading,
        error,
        approveDesigner,
        rejectDesigner,
        suspendDesigner,
        deleteDesigner
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
};