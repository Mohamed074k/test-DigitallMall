import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import SidebarMenu from "./sidebarComponents/SidebarMenu";
import SidebarSubmenu from "./sidebarComponents/SidebarSubMenu";
import SidebarItem from "./sidebarComponents/SidebarItem";

import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  DollarSign,
  Percent,
  FileText,
  Tags,
  Shirt,
  Store,
  PieChart,
  Activity,
  Cuboid,
} from "lucide-react";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  const handleToggle = () => setShow(!show);
  const handleClose = () => setShow(false);

  useEffect(() => {
    handleClose();
  }, [location.pathname]);

  return (
    <>
      <button onClick={handleToggle}>
        {show ? (
          <FaTimes className="text-2xl text-gray-600 hover:text-black duration-300 cursor-pointer" />
        ) : (
          <FaBars className="text-2xl text-gray-600 hover:text-black duration-300 cursor-pointer" />
        )}
      </button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="start"
        className="bg-gray-900 text-gray-100"
      >
        <Offcanvas.Header
          closeButton
          className="border-b border-gray-900/20 shadow-md"
        >
          <Offcanvas.Title>
            <span className="text-lg italic font-bold tracking-wide">
              Dashboard
            </span>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="p-0 overflow-y-auto no-scrollbar">
          <nav className="flex flex-col gap-1">
            {/* Widgets */}
            <SidebarMenu title="Widgets" icon={LayoutDashboard}>
              <SidebarSubmenu
                label="KPIs"
                path="widgets/kpis"
                icon={Activity}
              />
              <SidebarSubmenu
                label="Charts"
                path="widgets/charts"
                icon={PieChart}
              />
            </SidebarMenu>

            {/* Management */}
            <SidebarMenu title="Management" icon={Users}>
              <SidebarSubmenu
                label="Brands Management"
                path="management/brands"
                icon={Store}
              />
              <SidebarSubmenu
                label="Models Management"
                path="management/models"
                icon={Cuboid}
              />
              <SidebarSubmenu
                label="Designers Management"
                path="management/designers"
                icon={Shirt}
              />
              <SidebarSubmenu
                label="Users Management"
                path="management/users"
                icon={Users}
              />
            </SidebarMenu>

            {/* Orders */}
            <SidebarItem
              label="Orders Management"
              path="orders"
              icon={Package}
            />

            {/* Financial */}
            <SidebarMenu title="Financial & Payouts" icon={DollarSign}>
              <SidebarSubmenu
                label="Payout Management"
                path="financial/payouts"
                icon={DollarSign}
              />
              <SidebarSubmenu
                label="Commission & Rates"
                path="financial/commissions"
                icon={Percent}
              />
            </SidebarMenu>

            <SidebarItem
              label="Discounts & Promotions"
              path="discounts"
              icon={Tags}
            />
            <SidebarItem
              label="Reports & Analytics"
              path="reports"
              icon={FileText}
            />
            <SidebarItem
              label="Platform Settings"
              path="settings"
              icon={Settings}
            />
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
