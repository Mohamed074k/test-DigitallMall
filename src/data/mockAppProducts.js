// src/data/mockAppProducts.js
import placeholder from "../assets/images/placeholder.png";
import { mockBrandReels, getBrandReelsCount, getBrandLikesFromReels } from "./AppMockReels";

export const mockProducts = [
  {
    id: "prod_001",
    name: "Nike Air Max Sneakers",
    image: placeholder,
    price: 120.0,
    stock: 50,
    brand: "Nike",
    brandLogo: placeholder,
    brandDescription:
      "Nike, Inc. is an American athletic footwear and apparel corporation headquartered near Beaverton, Oregon.",
    sales: 1500,
    discount: 20,
    category: "Shoes",
    description:
      "Premium athletic sneakers with advanced cushioning technology and breathable mesh upper.",
    reviewCount: 128,
    subcategories: ["Athletic", "Running", "Casual"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    subimages: [placeholder, placeholder, placeholder, placeholder],
    gender: "Male",
    status: "Active",
  },
  {
    id: "prod_002",
    name: "Adidas Track Jacket",
    image: placeholder,
    price: 80.0,
    stock: 30,
    brand: "Adidas",
    brandLogo: placeholder,
    brandDescription:
      "Adidas AG is a German multinational corporation that designs and manufactures shoes, clothing and accessories.",
    sales: 1200,
    discount: 15,
    category: "Men",
    description:
      "Classic track jacket with three-stripe design and zip-up front.",
    reviewCount: 95,
    subcategories: ["Athletic", "Outerwear", "Sportswear"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    subimages: [placeholder, placeholder, placeholder, placeholder],
    gender: "Male",
    status: "Inactive",
  },
  {
    id: "prod_003",
    name: "Puma Running Shoes",
    image: placeholder,
    price: 90.0,
    stock: 20,
    brand: "Puma",
    brandLogo: placeholder,
    brandDescription:
      "Puma SE is a German multinational corporation that designs and manufactures athletic and casual footwear.",
    sales: 800,
    discount: 25,
    category: "Shoes",
    description:
      "High-performance running shoes with responsive cushioning and durable rubber outsole.",
    reviewCount: 67,
    subcategories: ["Running", "Athletic", "Performance"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    subimages: [placeholder, placeholder, placeholder, placeholder],
    gender: "Unisex",
    status: "Active",
  },
  {
    id: "prod_004",
    name: "Levi`s Denim Jeans",
    image: placeholder,
    price: 60.0,
    stock: 100,
    brand: "Levi`s",
    brandLogo: placeholder,
    brandDescription:
      "Levi Strauss & Co. is an American clothing company known worldwide for its Levi's brand of denim jeans.",
    sales: 2000,
    discount: 10,
    category: "Men",
    description:
      "Classic straight-fit denim jeans made from 100% cotton. Timeless style with modern comfort.",
    reviewCount: 234,
    subcategories: ["Casual", "Denim", "Everyday"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    subimages: [placeholder, placeholder, placeholder, placeholder],
    gender: "Male",
    status: "Active",
  },
  {
    id: "prod_005",
    name: "Zara Summer Dress",
    image: placeholder,
    price: 45.0,
    stock: 40,
    brand: "Zara",
    brandLogo: placeholder,
    brandDescription:
      "Zara is a Spanish fast-fashion retailer based in Arteixo, Galicia.",
    sales: 1000,
    discount: 30,
    category: "Women",
    description:
      "Elegant summer dress with floral print and flowing silhouette.",
    reviewCount: 156,
    subcategories: ["Casual", "Summer", "Floral"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    subimages: [placeholder, placeholder, placeholder, placeholder],
    gender: "Female",
    status: "Inactive",
  },
  {
    id: "prod_006",
    name: "H&M Casual T-Shirt",
    image: placeholder,
    price: 20.0,
    stock: 200,
    brand: "H&M",
    brandLogo: placeholder,
    brandDescription:
      "H&M is a Swedish multinational clothing company known for fast-fashion clothing.",
    sales: 2500,
    discount: 5,
    category: "Men",
    description: "Soft cotton t-shirt with relaxed fit and comfortable feel.",
    reviewCount: 189,
    subcategories: ["Casual", "Basic", "Cotton"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    subimages: [placeholder, placeholder, placeholder, placeholder],
    gender: "Unisex",
    status: "Active",
  },
  {
    id: "prod_007",
    name: "Gucci Sunglasses",
    image: placeholder,
    price: 250.0,
    stock: 10,
    brand: "Gucci",
    brandLogo: placeholder,
    brandDescription:
      "Gucci is an Italian luxury fashion house based in Florence, Italy.",
    sales: 500,
    discount: 40,
    category: "Accessories",
    description:
      "Luxury designer sunglasses with UV protection and premium materials.",
    reviewCount: 43,
    subcategories: ["Luxury", "Designer", "UV Protection"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    subimages: [placeholder, placeholder, placeholder, placeholder],
    gender: "Unisex",
    status: "Inactive",
  },
  {
    id: "prod_008",
    name: "Uniqlo Hoodie",
    image: placeholder,
    price: 50.0,
    stock: 60,
    brand: "Uniqlo",
    brandLogo: placeholder,
    brandDescription:
      "Uniqlo Co., Ltd. is a Japanese casual wear designer and retailer.",
    sales: 1800,
    discount: 12,
    category: "Men",
    description:
      "Comfortable pullover hoodie with kangaroo pocket and adjustable hood.",
    reviewCount: 112,
    subcategories: ["Casual", "Comfort", "Fleece"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    subimages: [placeholder, placeholder, placeholder, placeholder],
    gender: "Male",
    status: "Active",
  },
  {
    id: "prod_009",
    name: "Ralph Lauren Polo Shirt",
    image: placeholder,
    price: 70.0,
    stock: 25,
    brand: "Ralph Lauren",
    brandLogo: placeholder,
    brandDescription:
      "Ralph Lauren Corporation is an American fashion company founded in 1967.",
    sales: 900,
    discount: 18,
    category: "Men",
    description:
      "Classic polo shirt with embroidered logo and premium cotton pique fabric.",
    reviewCount: 78,
    subcategories: ["Polo", "Classic", "Cotton"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    subimages: [placeholder, placeholder, placeholder, placeholder],
    gender: "Male",
    status: "Inactive",
  },
  {
    id: "prod_010",
    name: "Under Armour Shorts",
    image: placeholder,
    price: 35.0,
    stock: 80,
    brand: "Under Armour",
    brandLogo: placeholder,
    brandDescription:
      "Under Armour, Inc. is an American sports clothing and accessories company.",
    sales: 600,
    discount: 22,
    category: "Kids",
    description:
      "Athletic shorts with moisture-wicking technology and elastic waistband.",
    reviewCount: 34,
    subcategories: ["Athletic", "Kids", "Sports"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    subimages: [placeholder, placeholder, placeholder, placeholder],
    gender: "Unisex",
    status: "Active",
  },
];

// ✅ Generate mockBrands from products
const brandMap = {};

// Generate placeholder logos for brands
const generateBrandLogo = (brandName) => {
  const colors = ['6366f1', '10b981', 'f59e0b', 'ef4444', '8b5cf6', '06b6d4', '84cc16', 'f97316'];
  const color = colors[brandName.length % colors.length];
  const initials = brandName.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  return `https://via.placeholder.com/400x400/${color}/ffffff?text=${initials}`;
};


mockProducts.forEach((product) => {
  const brandName = product.brand;
  if (!brandMap[brandName]) {
    brandMap[brandName] = {
      id: Object.keys(brandMap).length + 1,
      name: brandName,
      slug: brandName.toLowerCase().replace(/\s+/g, "-").replace("`", "").replace("&", "and"),
      logo: generateBrandLogo(brandName),
      followers: Math.floor(Math.random() * 100000) + 5000, // 5K–105K
      productsCount: 0,
      reelsCount: getBrandReelsCount(brandName), // Dynamic count from mock data
      likes: getBrandLikesFromReels(brandName) + Math.floor(Math.random() * 100000), // Base likes from reels + random
      isFollowing: false,
      isFavorited: Math.random() > 0.5, // Random favorite status
      description: product.brandDescription || `${brandName} – Official store and collections.`,
    };
  }
  brandMap[brandName].productsCount += 1;
});

export const mockBrands = Object.values(brandMap);

// Default export for backward compatibility
export default mockProducts;