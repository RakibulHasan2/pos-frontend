/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { CgMoreVertical } from "react-icons/cg";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { AiOutlineDashboard, AiOutlineSetting } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import useUser from "../getUser/GetUser";

export default function Navbar() {
  const [expanded, setExpanded] = useState(true);
  const user = useUser();
  console.log(user)
  const menuItems = [
    { id: "dashboard", text: "Dashboard", icon: <AiOutlineDashboard size={20} />, path: "/dashboard" },
    { id: "dashboard", text: "Add product", icon: <AiOutlineDashboard size={20} />, path: "/addProduct" },
    {
      id: "settings",
      text: "Settings",
      icon: <AiOutlineSetting size={20} />,
      submenu: [
        { id: "submenu1", text: "Submenu 1", icon: <FiUser size={16} />, path: "/settings/submenu1" },
        { id: "submenu2", text: "Submenu 2", icon: <FiUser size={16} />, path: "/settings/submenu2" },
      ],
    },
    {
      id: "info",
      text: "Info",
      icon: <AiOutlineSetting size={20} />,
      submenu: [
        { id: "about", text: "About", icon: <FiUser size={16} />, path: "/info/about" },
        { id: "contact", text: "Contact", icon: <FiUser size={16} />, path: "/info/contact" },
      ],
    },
    { id: "profile", text: "Profile", icon: <FiUser size={20} />, path: "/profile" },
  ];

  return (
    <div className="fixed">
      <aside className={`h-screen ${expanded ? "w-64" : "w-20"} transition-all`}>
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          {/* Header */}
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src="https://img.logoipsum.com/243.svg"
              className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
                }`}
              alt="Logo"
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <LuChevronFirst /> : <LuChevronLast />}
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {menuItems.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                text={item.text}
                icon={item.icon}
                path={item.path}
                submenu={item.submenu}
                expanded={expanded}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="border-t p-3 flex items-center">
            <p className="w-10 h-10  uppercase text-3xl font-bold rounded-lg flex justify-center items-center bg-blue-200">
              {user?.name?.charAt(0)}
            </p>

            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">{user?.name}</h4>
                <span className="text-xs text-gray-600">{user?.email}</span>
              </div>
              <CgMoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

// Sidebar Item Component
function NavItem({ icon, text, path, submenu, expanded }) {
  const location = useLocation();
  const [submenuOpen, setSubmenuOpen] = useState(false);

  // Check if the current path matches the NavItem's path
  const isActive = location.pathname === path;

  return (
    <div>
      <NavLink
        to={path || "#"}
        className={`flex items-center px-4 py-2 cursor-pointer transition-all ${isActive ? "bg-blue-100 text-blue-800" : "text-gray-600 hover:bg-gray-100"
          }`}
        onClick={() => {
          if (submenu) setSubmenuOpen((prev) => !prev);
        }}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
            }`}
        >
          {text}
        </span>
        {submenu && expanded && (
          <span className="ml-auto">
            {submenuOpen ? <BsChevronUp size={16} /> : <BsChevronDown size={16} />}
          </span>
        )}
      </NavLink>
      {submenu && (
        <div
          className={`overflow-hidden ml-3 bg-slate-200 transition-all duration-300 ${submenuOpen ? "max-h-screen" : "max-h-0"
            }`}
        >
          {submenu.map((subItem) => (
            <NavItem
              key={subItem.id}
              icon={subItem.icon}
              text={subItem.text}
              path={subItem.path}
              expanded={expanded}
            />
          ))}
        </div>
      )}
    </div>
  );
}
