// export const mockReels = [
//   {
//     id: 'reel_1',
//     videoUrl: 'https://www.youtube.com/watch?v=KE170tmi2zg',
//     thumbnail: 'https://placehold.co/100x100?text=Reel1',
//     description: 'Awesome reel showcasing our latest products',
//     hashtags: ['#fashion', '#newarrivals'],
//     linkedProducts: ['prod_001', 'prod_002'], // In real, could be objects with name
//     status: 'Active',
//     analytics: { views: 1500, likes: 300, shares: 50, purchases: 10 },
//   },
//   {
//     id: 'reel_2',
//     videoUrl: 'https://example.com/video2.mp4',
//     thumbnail: 'https://placehold.co/100x100?text=Reel2',
//     description: 'Quick tips and tricks',
//     hashtags: ['#tips', '#hacks'],
//     linkedProducts: ['prod_003'],
//     status: 'Inactive',
//     analytics: { views: 800, likes: 150, shares: 20, purchases: 5 },
//   },
// ];
 
// src/data/mockReels.js - FINAL VERSION with CORRECT PRODUCT IDS
export const mockReels = [
  {
    id: "reel_001",
    type: "brand", // brand | model
    userId: "brand_007",
    userName: "UrbanThreads",
    userAvatar: "/images/placeholder.png",

    videoUrl: "/videos/reel-demo.mp4",
    thumbnail: "/images/tshirt-front.png",
    description: "New summer collection drop! 👕 Swipe up to shop!",
    hashtags: ["#summer", "#collection", "#urbanthreads"],
    linkedProducts: ["prod_001", "prod_005"], // Corrected to match mockProducts
    status: "Active",

    analytics: { views: 2500, likes: 1247, shares: 89, purchases: 45 },

    createdAt: "2025-04-05T10:30:00Z",
    isLiked: false,
    isFavorite: false,
  },
  {
    id: "reel_002",
    type: "model",
    userId: "model_042",
    userName: "LilaSway",
    userAvatar: "/images/placeholder.png",

    videoUrl: "/videos/reel-demo2.mp4",
    thumbnail: "/images/white-realistic-t-shirt-isolated-front-back.png",
    description: "How I style my favorite tee for brunch ☀️ #OOTD",
    hashtags: ["#ootd", "#brunchstyle"],
    linkedProducts: ["prod_001"], // Corrected to match mockProducts
    status: "Active",

    analytics: { views: 5200, likes: 3210, shares: 214, purchases: 110 },

    createdAt: "2025-04-05T09:15:00Z",
    isLiked: true,
    isFavorite: true,
  },
  {
    id: "reel_003",
    type: "brand",
    userId: "brand_012",
    userName: "StreetStyle Co",
    userAvatar: "/images/placeholder.png",

    videoUrl: "/videos/reel-demo3.mp4",
    thumbnail: "/images/slide-1.jpg",
    description: "New drops live now! Limited stock 🚨",
    hashtags: ["#streetstyle", "#newdrops"],
    linkedProducts: ["prod_006"], // Corrected to match mockProducts
    status: "Inactive",

    analytics: { views: 1200, likes: 892, shares: 67, purchases: 30 },

    createdAt: "2025-04-05T08:45:00Z",
    isLiked: false,
    isFavorite: false,
  },
  {
    id: "reel_004",
    type: "model",
    userId: "model_019",
    userName: "EliTheModel",
    userAvatar: "/images/placeholder.png",

    videoUrl: "/videos/reel-demo.mp4",
    thumbnail: "/images/slide-3.jpg",
    description: "Just got this custom print 😍 What do you think?",
    hashtags: ["#custom", "#print", "#modelstyle"],
    linkedProducts: ["prod_011"], // Corrected to match mockProducts
    status: "Active",

    analytics: { views: 7800, likes: 5432, shares: 412, purchases: 200 },

    createdAt: "2025-04-05T07:20:00Z",
    isLiked: true,
    isFavorite: false,
  },
  {
    id: "reel_005",
    type: "brand",
    userId: "brand_007",
    userName: "UrbanThreads",
    userAvatar: "/images/placeholder.png",

    videoUrl: "/videos/reel-demo2.mp4",
    thumbnail: "/images/white-realistic-t-shirt-isolated-front-back.png",
    description: "Our collab with @LilaSway is LIVE! 👇",
    hashtags: ["#collab", "#urbanthreads", "#lilasway"],
    linkedProducts: ["prod_001"], // Corrected to match mockProducts
    status: "Active",

    analytics: { views: 4100, likes: 2105, shares: 156, purchases: 80 },

    createdAt: "2025-04-05T06:10:00Z",
    isLiked: false,
    isFavorite: true,
  },
  {
    id: "reel_006",
    type: "model",
    userId: "model_042",
    userName: "LilaSway",
    userAvatar: "/images/placeholder.png",

    videoUrl: "/videos/reel-demo3.mp4",
    thumbnail: "/images/short_sleeves_grey_t_shirt_mockup.png",
    description: "Shopping at Digital Mall — yes, you can buy what you see!",
    hashtags: ["#shopping", "#digitallook"],
    linkedProducts: ["prod_005"], // Corrected to match mockProducts
    status: "Inactive",

    analytics: { views: 3200, likes: 1876, shares: 98, purchases: 60 },

    createdAt: "2025-04-05T05:05:00Z",
    isLiked: true,
    isFavorite: false,
  },
];

// Mock following relationships (user follows these creators)
export const mockFollowing = [
  "brand_007", // UrbanThreads
  "model_042", // LilaSway
];

// For demo only — simulate user's following list
export const mockUserFollows = {
  brandIds: ["brand_007"],
  modelIds: ["model_042"],
};