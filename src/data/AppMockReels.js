// App Mock Reels Data - Enhanced with Analytics
// This file contains the comprehensive reel data with analytics for both brands and models

// Mock reels data for brands
export const mockBrandReels = [
  {
    id: 'reel_1',
    brand: 'Nike',
    title: 'New Collection Launch',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://placehold.co/400x300/000000/FFFFFF?text=Nike+Reel+1',
    description: 'Awesome reel showcasing our latest products',
    hashtags: ['#fashion', '#newarrivals', '#nike'],
    linkedProducts: ['prod_001', 'prod_002'],
    status: 'Active',
    analytics: { views: 1500, likes: 300, shares: 50, purchases: 10 },
    date: '2024-01-15'
  },
  {
    id: 'reel_2',
    brand: 'Nike',
    title: 'Behind the Scenes',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://placehold.co/400x300/000000/FFFFFF?text=Nike+Reel+2',
    description: 'Quick tips and tricks',
    hashtags: ['#tips', '#hacks', '#nike'],
    linkedProducts: ['prod_001'],
    status: 'Active',
    analytics: { views: 800, likes: 150, shares: 20, purchases: 5 },
    date: '2024-01-10'
  },
  {
    id: 'reel_3',
    brand: 'Adidas',
    title: 'Customer Reviews',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://placehold.co/400x300/000000/FFFFFF?text=Adidas+Reel+1',
    description: 'Customer testimonials and reviews',
    hashtags: ['#reviews', '#adidas', '#testimonials'],
    linkedProducts: ['prod_002'],
    status: 'Active',
    analytics: { views: 1200, likes: 250, shares: 30, purchases: 8 },
    date: '2024-01-12'
  },
  {
    id: 'reel_4',
    brand: 'Adidas',
    title: 'Product Showcase',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://placehold.co/400x300/000000/FFFFFF?text=Adidas+Reel+2',
    description: 'Showcasing our latest athletic wear',
    hashtags: ['#athletic', '#adidas', '#showcase'],
    linkedProducts: ['prod_002', 'prod_003'],
    status: 'Active',
    analytics: { views: 900, likes: 180, shares: 25, purchases: 6 },
    date: '2024-01-08'
  },
  {
    id: 'reel_5',
    brand: 'Puma',
    title: 'Fashion Tips',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://placehold.co/400x300/000000/FFFFFF?text=Puma+Reel+1',
    description: 'Fashion tips and styling advice',
    hashtags: ['#fashion', '#puma', '#styling'],
    linkedProducts: ['prod_003'],
    status: 'Active',
    analytics: { views: 1100, likes: 220, shares: 35, purchases: 7 },
    date: '2024-01-05'
  }
];

// Mock reels data for models
export const mockModelReels = [
  {
    id: 'model_reel_1',
    model: 'ahmed',
    title: 'Fashion Week Behind the Scenes',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://placehold.co/400x300/6366f1/FFFFFF?text=Ahmed+Reel+1',
    description: 'Behind the scenes at fashion week',
    hashtags: ['#fashion', '#behindthescenes', '#ahmed'],
    status: 'Active',
    analytics: { views: 12500, likes: 1250, shares: 150, comments: 89, purchases: 0 },
    date: '2024-01-15'
  },
  {
    id: 'model_reel_2',
    model: 'ahmed',
    title: 'Sustainable Fashion Tips',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://placehold.co/400x300/6366f1/FFFFFF?text=Ahmed+Reel+2',
    description: 'Tips for sustainable fashion choices',
    hashtags: ['#sustainable', '#fashion', '#ahmed'],
    status: 'Active',
    analytics: { views: 8900, likes: 890, shares: 120, comments: 67, purchases: 0 },
    date: '2024-01-10'
  },
  {
    id: 'model_reel_3',
    model: 'mohamed',
    title: 'Luxury Brand Photoshoot',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://placehold.co/400x300/10b981/FFFFFF?text=Mohamed+Reel+1',
    description: 'Behind the scenes of luxury brand photoshoot',
    hashtags: ['#luxury', '#photoshoot', '#mohamed'],
    status: 'Active',
    analytics: { views: 45600, likes: 4560, shares: 600, comments: 234, purchases: 0 },
    date: '2024-01-18'
  },
  {
    id: 'model_reel_4',
    model: 'mohamed',
    title: 'Dubai Fashion Week',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://placehold.co/400x300/10b981/FFFFFF?text=Mohamed+Reel+2',
    description: 'Highlights from Dubai Fashion Week',
    hashtags: ['#dubai', '#fashionweek', '#mohamed'],
    status: 'Active',
    analytics: { views: 32100, likes: 3210, shares: 450, comments: 189, purchases: 0 },
    date: '2024-01-12'
  },
  {
    id: 'model_reel_5',
    model: 'ahmed',
    title: 'Morning Workout Routine',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://placehold.co/400x300/6366f1/FFFFFF?text=Ahmed+Reel+3',
    description: 'Daily workout routine for fitness enthusiasts',
    hashtags: ['#fitness', '#workout', '#ahmed'],
    status: 'Active',
    analytics: { views: 15600, likes: 1560, shares: 200, comments: 98, purchases: 0 },
    date: '2024-01-05'
  },
  {
    id: 'model_reel_6',
    model: 'mohamed',
    title: 'Editorial Shoot Behind the Scenes',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnail: 'https://placehold.co/400x300/10b981/FFFFFF?text=Mohamed+Reel+3',
    description: 'Behind the scenes of editorial photoshoot',
    hashtags: ['#editorial', '#photoshoot', '#mohamed'],
    status: 'Active',
    analytics: { views: 28900, likes: 2890, shares: 380, comments: 156, purchases: 0 },
    date: '2024-01-08'
  }
];

// Export both for backward compatibility
export const mockReels = mockBrandReels;

// Helper functions for dynamic counting
export const getBrandReelsCount = (brandName) => {
  return mockBrandReels.filter(reel => reel.brand === brandName).length;
};

export const getBrandLikesFromReels = (brandName) => {
  return mockBrandReels
    .filter(reel => reel.brand === brandName)
    .reduce((total, reel) => total + reel.analytics.likes, 0);
};

export const getModelReelsCount = (modelSlug) => {
  return mockModelReels.filter(reel => reel.model === modelSlug).length;
};

export const getModelLikesFromReels = (modelSlug) => {
  return mockModelReels
    .filter(reel => reel.model === modelSlug)
    .reduce((total, reel) => total + reel.analytics.likes, 0);
};

