import React, { useState } from "react";
import {
  AiOutlineAlignLeft,
  AiOutlineAreaChart,
  AiFillShopping,
  AiFillHome,
} from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { BsFillPersonFill, BsFillCartFill } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  if (user.role === "manager") {
    return (
      <div className="flex flex-col gap-2 py-3 bg-white">
        <button className="px-4 py-2" onClick={toggleSidebar}>
          <AiOutlineAlignLeft size={20} />
        </button>
        <NavItem
          title="Dashboard"
          link="/dashboard"
          isOpen={isOpen}
          icon={<MdDashboard />}
        />
        <NavItem
          title="Report"
          link="/salesreport"
          isOpen={isOpen}
          icon={<AiOutlineAreaChart />}
        />
        <NavItem
          title="Products"
          link="/products"
          isOpen={isOpen}
          icon={<AiFillShopping />}
        />
        <NavItem
          title="Customers"
          link="/customers"
          isOpen={isOpen}
          icon={<BsFillPersonFill />}
        />
        <NavItem
          title="Orders"
          link="/orders"
          isOpen={isOpen}
          icon={<BsFillCartFill />}
        />
      </div>
    );
  }
  if (user.role === "cashier") {
    return (
      <div className="flex flex-col gap-2 py-3 bg-white">
        <button className="px-4 py-2" onClick={toggleSidebar}>
          <AiOutlineAlignLeft size={20} />
        </button>
        <NavItem
          title="Home"
          link="/home"
          isOpen={isOpen}
          icon={<AiFillHome />}
        />
        <NavItem
          title="Products"
          link="/products"
          isOpen={isOpen}
          icon={<AiFillShopping />}
        />
        <NavItem
          title="Customers"
          link="/customers"
          isOpen={isOpen}
          icon={<BsFillPersonFill />}
        />
        <NavItem
          title="Orders"
          link="/orders"
          isOpen={isOpen}
          icon={<BsFillCartFill />}
        />
      </div>
    );
  }
};

const NavItem = ({ title, link, icon, isOpen }) => {
  return (
    <NavLink
      to={link}
      activeclassname="bg-slate-200 w-full"
      aria-current="page"
    >
      <div className="flex px-4 py-2 hover:bg-slate-200 gap-2 w-fit items-center w-full">
        <div>{icon}</div>
        {isOpen && <div>{title}</div>}
      </div>
    </NavLink>
  );
};

export default SideNav;
