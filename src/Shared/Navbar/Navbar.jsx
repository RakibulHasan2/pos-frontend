/* eslint-disable react/prop-types */
import { useState } from "react";
import { CgMoreVertical } from "react-icons/cg";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { AiOutlineDashboard, AiOutlineSetting } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

export default function Navbar() {
  const [expanded, setExpanded] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null); // Track active menu
  const [submenu1Open, setsubmenu1Open] = useState(false); // Track submenu state
  const [submenu2Open, setsubmenu2Open] = useState(false); // Track submenu state

  return (
    <aside className={`h-screen ${expanded ? "w-64" : "w-20"} transition-all`}>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        {/* Header */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
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
          {/* Dashboard */}
          <NavItem
            icon={<AiOutlineDashboard size={20} />}
            text="Dashboard"
            active={activeMenu === "dashboard"}
            onClick={() => setActiveMenu("dashboard")}
            expanded={expanded}
          />
          {/* Settings with Submenu */}
          <NavItem
            icon={<AiOutlineSetting size={20} />}
            text="Settings"
            active={activeMenu === "settings"}
            onClick={() => {
              setActiveMenu("settings");
              setsubmenu1Open((prev) => !prev);
            }}
            expanded={expanded}
            submenu1Open={submenu1Open}
          >
            <div
              className={`overflow-hidden ml-3 bg-slate-200 transition-all duration-300 ${
                submenu1Open ? "max-h-screen" : "max-h-0"
              }`}
            >
              <NavItem
                text="Submenu 1"
                icon={<FiUser size={16} />}
                onClick={() => setActiveMenu("submenu1")}
                active={activeMenu === "submenu1"}
                expanded={expanded}
              />
              <NavItem
                text="Submenu 2"
                icon={<FiUser size={16} />}
                onClick={() => setActiveMenu("submenu2")}
                active={activeMenu === "submenu2"}
                expanded={expanded}
              />
            </div>
          </NavItem>

          {/* Settings with Submenu */}
          <NavItem
            icon={<AiOutlineSetting size={20} />}
            text="Settings2"
            active={activeMenu === "settings2"}
            onClick={() => {
              setActiveMenu("settings2");
              setsubmenu2Open((prev) => !prev);
            }}
            expanded={expanded}
            submenu1Open={submenu2Open}
          >
            <div
              className={`overflow-hidden ml-3 bg-slate-200 transition-all duration-300 ${
                submenu1Open ? "max-h-screen" : "max-h-0"
              }`}
            >
              <NavItem
                text="Submenu 1"
                icon={<FiUser size={16} />}
                onClick={() => setActiveMenu("submenu1")}
                active={activeMenu === "submenu1"}
                expanded={expanded}
              />
              <NavItem
                text="Submenu 2"
                icon={<FiUser size={16} />}
                onClick={() => setActiveMenu("submenu2")}
                active={activeMenu === "submenu2"}
                expanded={expanded}
              />
            </div>
          </NavItem>

          {/* Profile */}
          <NavItem
            icon={<FiUser size={20} />}
            text="Profile"
            active={activeMenu === "profile"}
            onClick={() => setActiveMenu("profile")}
            expanded={expanded}
          />
        </div>

        {/* Footer */}
        <div className="border-t p-3 flex items-center">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="User"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <CgMoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

// Sidebar Item Component
function NavItem({
  icon,
  text,
  active,
  onClick,
  expanded,
  submenu1Open,
  submenu2Open,
  children,
}) {
  return (
    <div>
      <div
        onClick={onClick}
        className={`flex items-center px-4 py-2 cursor-pointer transition-all ${
          active
            ? "bg-blue-100 text-blue-800"
            : "hover:bg-gray-100 text-gray-600"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {children && expanded && (
          <span className="ml-auto">
            {submenu1Open | submenu2Open ? <BsChevronUp size={16} /> : <BsChevronDown size={16} />}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
