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
  Settings,
  DollarSign,
  FileText,
  Tags,
  PieChart,
  Activity,
  Cuboid,
  VideoIcon,
} from "lucide-react";

const BrandSidebar = () => {
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

            <SidebarItem
              label="Products Management"
              path="management/products"
              icon={Cuboid}
            />

            <SidebarItem
              label="Orders Management"
              path="management/orders"
              icon={Package}
            />
            <SidebarItem
              label="Reels Management"
              path="management/reels"
              icon={VideoIcon}
            />
            <SidebarItem
              label="Discounts & Promotions"
              path="discounts"
              icon={Tags}
            />
            <SidebarItem
              label="Financial & Earnings"
              path="earnings"
              icon={DollarSign}
            />
            {/* <SidebarItem
              label="Statistics & Analytics"
              path="statistics"
              icon={FileText}
            /> */}
            <SidebarItem
              label="Profile & Settings"
              path="settings"
              icon={Settings}
            />
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default BrandSidebar;
