/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { CgMoreVertical } from "react-icons/cg";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { AiOutlineDashboard, AiOutlineProduct, AiOutlineSetting } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import useUser from "../getUser/GetUser";
import { MdFormatListBulletedAdd, MdOutlinePlaylistAddCheck } from "react-icons/md";
import logo from "../../assets/logo/logo.jpg"
export default function Navbar() {
  const [expanded, setExpanded] = useState(true);
  const user = useUser();
  console.log(user)
  const menuItems = [
    { id: "dashboard", text: "Dashboard", icon: <AiOutlineDashboard size={20} />, path: "/dashboard" },
    // { id: "dashboard", text: "Add product", icon: <AiOutlineDashboard size={20} />, path: "/addProduct" },
    {
      id: "Products",
      text: "Products",
      icon: <AiOutlineProduct  size={20} />,
      submenu: [
        { id: "AddProduct", text: "Add Product", icon: <MdFormatListBulletedAdd size={16} />, path: "/addProduct" },
        { id: "AllProducts", text: "All Products", icon: <MdOutlinePlaylistAddCheck size={18} />, path: "/allProducts" },
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
 
  ];

  return (
    <div className="fixed">
      <aside className={`h-screen ${expanded ? "w-64" : "w-20"} transition-all`}>
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          {/* Header */}
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src={logo}
              className={`overflow-hidden transition-all rounded-xl ${expanded ? "w-12" : "w-12"
                }`}
              alt="Logo"
            />
            <p className={`overflow-hidden transition-all text-2xl font-bold rounded-xl ${expanded ? "block" : "hidden"
                }`}>Positive It</p>
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
             <NavLink to="/myProfile">
              <div className="leading-4">
                <h4 className="font-semibold">{user?.name}</h4>
                <span className="text-xs text-gray-600">{user?.email}</span>
              </div>
              </NavLink> 
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
