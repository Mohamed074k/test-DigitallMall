import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

//Layouts
import App from "./layouts/App.jsx";
import SuperAdminLayout from "./layouts/SuperAdminLayout.jsx";
import DesignerAdminLayout from "./layouts/DesignerAdminLayout.jsx";
import BrandAdminLayout from "./layouts/BrandAdminLayout.jsx";
import FashionModelAdminLayout from "./layouts/FashionModelAdminLayout.jsx";

// Contexts
import { DiscountProvider } from "./context/superAdminContext/DiscountContext.jsx";
import { BrandProvider } from "./context/superAdminContext/BrandContext";
import { UserProvider } from "./context/superAdminContext/UserContext";
import { ModelProvider } from "./context/superAdminContext/ModelContext";
import { OrderProvider } from "./context/superAdminContext/OrderContext";
import { DesignerProvider } from "./context/superAdminContext/DesignerContext";
import { PlatformSettingsProvider } from "./context/superAdminContext/PlatformSettingsContext.jsx";
import { PayoutProvider } from "./context/superAdminContext/PayoutContext";
import { DesignRequestProvider } from "./context/designerContext/DesignRequestContext.jsx";
import { EarningsProvider } from "./context/designerContext/DesignerEarningsContext.jsx";
import { DesignerProfileProvider } from "./context/designerContext/DesignerProfileContext.jsx";
import { DesignSubmissionProvider } from "./context/designerContext/DesignSubmissionContext.jsx";
import { BrandOrdersProvider } from "./context/brandContext/BrandOrdersContext.jsx";
import { BrandProductsProvider } from "./context/BrandContext/BrandProductsContext.jsx";
import { BrandDiscountProvider } from "./context/brandContext/BrandDiscountsContext.jsx";
import { BrandReelsProvider } from "./context/brandContext/BrandReelsContext.jsx";
import { BrandProfileProvider } from "./context/brandContext/BrandProfileContext.jsx";
import { BrandEarningsProvider } from "./context/brandContext/BrandEarningsContext.jsx";
import { ModelProfileProvider } from "./context/modelContext/ModelProfileContext.jsx";
import { ModelEarningsProvider } from "./context/modelContext/ModelEarningsContext.jsx";
import { ModelReelsProvider } from "./context/modelContext/ModelReelsContext.jsx";
import { CartProvider } from "./context/AppContext/CartContext.jsx";
import { AuthProvider } from "./context/AppContext";
import { UserProfileProvider } from "./context/AppContext/UserProfileContext.jsx";
import { AppBrandProfileProvider } from "./context/AppContext/AppBrandProfileContext.jsx";
import { FavouriteProvider } from "./context/AppContext/FavouriteContext.jsx";

// Error Page
import ErrorPage from "./pages/Error/ErrorPage.jsx";

// App Pages
import Home from "./pages/App/Home.jsx";
import Cart from "./pages/App/Cart.jsx";
import Categories from "./pages/App/Categories.jsx";
import Checkout from "./pages/App/Checkout.jsx";
import DesignShirt from "./pages/App/DesignShirt.jsx";
import Favourites from "./pages/App/Favourites.jsx";
import Login from "./pages/App/Login.jsx";
import ProductDetailsPage from "./pages/App/ProductDetailsPage.jsx";
import Reels from "./pages/App/Reels.jsx";
import Register from "./pages/App/Register.jsx";
import AppBrandProfile from "./pages/App/profiles/BrandProfile.jsx";
import SearchPage from "./pages/App/SearchPage.jsx";
import ModelProfile from "./pages/App/profiles/ModelProfile.jsx";
import UserProfilePage from "./pages/App/profiles/UserProfilePage.jsx";

// Super Admin Dashboard Pages
import Widgets_KPIs from "./pages/Admins/SuperAdmin/Widgets_KPIs.jsx";
import Widgets_Charts from "./pages/Admins/SuperAdmin/Widgets_Charts.jsx";
import OrdersManagement from "./pages/Admins/SuperAdmin/OrdersManagement.jsx";
import Management_Brands from "./pages/Admins/SuperAdmin/Management_Brands.jsx";
import Management_Designers from "./pages/Admins/SuperAdmin/Management_Designers.jsx";
import Management_Users from "./pages/Admins/SuperAdmin/Management_Users.jsx";
import Management_Models from "./pages/Admins/SuperAdmin/Management_Models.jsx";
import Financial_PayoutManagement from "./pages/Admins/SuperAdmin/Financial_PayoutManagement.jsx";
import Financial_Commission from "./pages/Admins/SuperAdmin/Financial_Commission.jsx";
import Discounts from "./pages/Admins/SuperAdmin/Discounts.jsx";
import Reports from "./pages/Admins/SuperAdmin/Reports.jsx";
import PlatformSettings from "./pages/Admins/SuperAdmin/PlatformSettings.jsx";

// Designer Admin Dashboard Pages
import Widgets_Cards from "./pages/Admins/DesignerAdmin/Widgets_Cards.jsx";
import Widgets_Charts_d from "./pages/Admins/DesignerAdmin/Widgets_Charts_d.jsx";
import Profile_Settings from "./pages/Admins/DesignerAdmin/Profile_Settings.jsx";
import Earnings_Payout from "./pages/Admins/DesignerAdmin/Earnings_Payout.jsx";
import Designs_Submission from "./pages/Admins/DesignerAdmin/Designs_Submission.jsx";
import Designs_Requests from "./pages/Admins/DesignerAdmin/Designs_Requests.jsx";

// Brand Admin Dashboard Pages
import Widgets_KPIs_b from "./pages/Admins/Brand/Widgets_KPIs_b.jsx";
import Widgets_Charts_b from "./pages/Admins/Brand/Widgets_Charts_b.jsx";
import ProductsManageBrand from "./pages/Admins/Brand/ProductsManageBrand.jsx";
import OrdersManageBrand from "./pages/Admins/Brand/OrdersManageBrand.jsx";
import ReelsManageBrand from "./pages/Admins/Brand/ReelsManageBrand.jsx";
import DiscountsBrand from "./pages/Admins/Brand/DiscountsBrand.jsx";
import EarningsBrand from "./pages/Admins/Brand/EarningsBrand.jsx";
// import StatisticsBrand from "./pages/Admins/Brand/StatisticsBrand.jsx";
import BrandProfile from "./pages/Admins/Brand/BrandProfile.jsx";

// Fashion Model Dashboard Pages
import Widgets_Cards_M from "./pages/Admins/FashionModels/Widgets_Cards_M.jsx";
import Widgets_Charts_M from "./pages/Admins/FashionModels/Widgets_Charts_M.jsx";
import ModelEarnings from "./pages/Admins/FashionModels/ModelEarnings.jsx";
import ReelsManagementModel from "./pages/Admins/FashionModels/ModelReelsManagement.jsx";
import ModelSettings from "./pages/Admins/FashionModels/ModelSettings.jsx";
import ReelsProductDetails from "./components/APP_COMPONENTS/reelsComponents/ReelsProductDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "categories", element: <Categories /> },
      { path: "product/:id", element: <ProductDetailsPage /> },
      { path: "favourites", element: <Favourites /> },
      { path: "reels", element: <Reels /> },
      {path: '/products', element:<ReelsProductDetails /> },
      { path: "design-shirt", element: <DesignShirt /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "search", element: <SearchPage /> },
      { path: "user-profile", element: <UserProfilePage /> },
      { path: "brand-profile/:brandSlug", element: <AppBrandProfile /> },
      { path: "model-profile/:modelSlug", element: <ModelProfile /> },
    ],
  },
  {
    path: "/super",
    element: <SuperAdminLayout />,
    children: [
      { index: true, element: <Widgets_KPIs /> },
      { path: "widgets/kpis", element: <Widgets_KPIs /> },
      { path: "widgets/charts", element: <Widgets_Charts /> },
      { path: "management/brands", element: <Management_Brands /> },
      { path: "management/models", element: <Management_Models /> },
      { path: "management/designers", element: <Management_Designers /> },
      { path: "management/users", element: <Management_Users /> },
      { path: "orders", element: <OrdersManagement /> },
      { path: "financial/payouts", element: <Financial_PayoutManagement /> },
      { path: "financial/commissions", element: <Financial_Commission /> },
      { path: "discounts", element: <Discounts /> },
      { path: "reports", element: <Reports /> },
      { path: "settings", element: <PlatformSettings /> },
    ],
  },
  {
    path: "/designerdash",
    element: <DesignerAdminLayout />,
    children: [
      { index: true, element: <Widgets_Cards /> },
      { path: "widgets/cards", element: <Widgets_Cards /> },
      { path: "widgets/charts", element: <Widgets_Charts_d /> },
      { path: "settings", element: <Profile_Settings /> },
      { path: "earnings", element: <Earnings_Payout /> },
      { path: "submissions", element: <Designs_Submission /> },
      { path: "requests", element: <Designs_Requests /> },
    ],
  },
  {
    path: "/branddash",
    element: <BrandAdminLayout />,
    children: [
      { index: true, element: <Widgets_KPIs_b /> },
      { path: "widgets/kpis", element: <Widgets_KPIs_b /> },
      { path: "widgets/charts", element: <Widgets_Charts_b /> },
      { path: "management/products", element: <ProductsManageBrand /> },
      { path: "management/orders", element: <OrdersManageBrand /> },
      { path: "management/reels", element: <ReelsManageBrand /> },
      { path: "discounts", element: <DiscountsBrand /> },
      { path: "earnings", element: <EarningsBrand /> },
      // { path: "statistics", element: <StatisticsBrand /> },
      { path: "settings", element: <BrandProfile /> },
    ],
  },
  {
    path: "/fashionmodeldash",
    element: <FashionModelAdminLayout />,
    children: [
      { index: true, element: <Widgets_Cards_M /> },
      { path: "widgets/cards", element: <Widgets_Cards_M /> },
      { path: "widgets/charts", element: <Widgets_Charts_M /> },
      { path: "management/reels", element: <ReelsManagementModel /> },
      { path: "earnings", element: <ModelEarnings /> },
      { path: "settings", element: <ModelSettings /> },
    ],
  },
  { path: "*", element: <ErrorPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <FavouriteProvider>
      <AppBrandProfileProvider>
        <UserProfileProvider>
          <AuthProvider>
            <CartProvider>
              <BrandProductsProvider>
                <ModelEarningsProvider>
                  <ModelProfileProvider>
                    <ModelReelsProvider>
                      <BrandEarningsProvider>
                        <BrandProfileProvider>
                          <BrandOrdersProvider>
                            <BrandReelsProvider>
                              <BrandDiscountProvider>
                                <DesignRequestProvider>
                                  <DesignSubmissionProvider>
                                    <DesignerProfileProvider>
                                      <EarningsProvider>
                                        <PlatformSettingsProvider>
                                          <DiscountProvider>
                                            <PayoutProvider>
                                              <DesignerProvider>
                                                <OrderProvider>
                                                  <ModelProvider>
                                                    <UserProvider>
                                                      <BrandProvider>
                                                        <RouterProvider
                                                          router={router}
                                                        />
                                                      </BrandProvider>
                                                    </UserProvider>
                                                  </ModelProvider>
                                                </OrderProvider>
                                              </DesignerProvider>
                                            </PayoutProvider>
                                          </DiscountProvider>
                                        </PlatformSettingsProvider>
                                      </EarningsProvider>
                                    </DesignerProfileProvider>
                                  </DesignSubmissionProvider>
                                </DesignRequestProvider>
                              </BrandDiscountProvider>
                            </BrandReelsProvider>
                          </BrandOrdersProvider>
                        </BrandProfileProvider>
                      </BrandEarningsProvider>
                    </ModelReelsProvider>
                  </ModelProfileProvider>
                </ModelEarningsProvider>
              </BrandProductsProvider>
            </CartProvider>
          </AuthProvider>
        </UserProfileProvider>
      </AppBrandProfileProvider>
    </FavouriteProvider>
   </StrictMode>
);
