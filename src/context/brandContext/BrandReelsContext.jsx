// BrandReelsContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const BrandReelsContext = createContext();

export const BrandReelsProvider = ({ children }) => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reelsPerPage] = useState(10);

  // Mock data (in a real app, import from '../../data/mockReels')
  const mockReels = [
    {
      id: 'reel_1',
      videoUrl: 'https://www.youtube.com/watch?v=KE170tmi2zg',
      thumbnail: 'https://placehold.co/100x100?text=Reel1',
      description: 'Awesome reel showcasing our latest products',
      hashtags: ['#fashion', '#newarrivals'],
      linkedProducts: ['prod_1', 'prod_2'], // In real, could be objects with name
      status: 'Active',
      analytics: { views: 1500, likes: 300, shares: 50, purchases: 10 },
    },
    {
      id: 'reel_2',
      videoUrl: 'https://example.com/video2.mp4',
      thumbnail: 'https://placehold.co/100x100?text=Reel2',
      description: 'Quick tips and tricks',
      hashtags: ['#tips', '#hacks'],
      linkedProducts: ['prod_3'],
      status: 'Inactive',
      analytics: { views: 800, likes: 150, shares: 20, purchases: 5 },
    },
  ];

  // Load mock data
  useEffect(() => {
    const fetchReels = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setReels(mockReels);
      } catch (err) {
        setError('Failed to fetch reels');
        console.error('Error fetching reels:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  // Add reel
  const addReel = async (newReel) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      const reel = {
        ...newReel,
        id: `reel_${Date.now()}`,
        analytics: { views: 0, likes: 0, shares: 0, purchases: 0 },
      };
      setReels(prevReels => [...prevReels, reel]);
      return true;
    } catch (err) {
      console.error('Failed to add reel:', err);
      return false;
    }
  };

  // Update reel
  const updateReel = async (reelId, updatedReel) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      setReels(prevReels =>
        prevReels.map(reel =>
          reel.id === reelId ? { ...reel, ...updatedReel } : reel
        )
      );
      return true;
    } catch (err) {
      console.error('Failed to update reel:', err);
      return false;
    }
  };

  // Delete reel
  const deleteReel = async (reelId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      setReels(prevReels => prevReels.filter(reel => reel.id !== reelId));
      return true;
    } catch (err) {
      console.error('Failed to delete reel:', err);
      return false;
    }
  };

  // Filter reels
  const filterReels = (filters) => {
    let filtered = reels;
    
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(reel => reel.status === filters.status);
    }
    
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(reel => 
        reel.description.toLowerCase().includes(term) ||
        reel.hashtags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    return filtered;
  };

  // Get current reels
  const indexOfLastReel = currentPage * reelsPerPage;
  const indexOfFirstReel = indexOfLastReel - reelsPerPage;
  const currentReels = reels.slice(indexOfFirstReel, indexOfLastReel);
  const totalPages = Math.ceil(reels.length / reelsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <BrandReelsContext.Provider
      value={{
        reels,
        loading,
        error,
        currentReels,
        currentPage,
        reelsPerPage,
        totalPages,
        paginate,
        filterReels,
        addReel,
        updateReel,
        deleteReel
      }}
    >
      {children}
    </BrandReelsContext.Provider>
  );
};

export const useBrandReels = () => {
  const context = useContext(BrandReelsContext);
  if (!context) {
    throw new Error('useBrandReels must be used within a BrandReelsProvider');
  }
  return context;
};