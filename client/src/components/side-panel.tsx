import { PanelLeft } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "./ui/button";

const SidePanel = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  if (location.pathname === "/") {
    return null;
  }

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊",
      color: "var(--color-peach)",
      href: "/dashboard",
    },
    {
      id: "expenses",
      label: "Expenses",
      icon: "💸",
      color: "var(--color-coral)",
      href: "/expenses",
    },
    {
      id: "income",
      label: "Income",
      icon: "💵",
      color: "var(--color-mint)",
      href: "/income",
    },
    {
      id: "budgets",
      label: "Budgets",
      icon: "🎯",
      color: "var(--color-lavender)",
      href: "/budgets",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: "📈",
      color: "var(--color-teal)",
      href: "/analytics",
    },
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-border bg-white md:h-full ${
        collapsed ? "w-20 items-center" : "min-w-64"
      }`}
    >
      <div className="hidden md:flex items-center justify-between p-3 border-b border-border">
        {!collapsed && (
          <h1 className={`font-md text-lg hidden md:block`}>Navigation</h1>
        )}
        <Button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded bg-border text-black hover:text-white transition"
        >
          <PanelLeft
            size={20}
            className={`transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="sticky md:static flex md:block justify-evenly md:space-y-2 border-t border-border md:border-0 rounded-t-xl p-4 md:p-2">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive ? "text-white" : "text-black hover:bg-border"
              }`
            }
            style={({ isActive }) =>
              isActive
                ? { backgroundColor: item.color, textDecoration: "none" }
                : { textDecoration: "none" }
            }
          >
            <span className="text-lg">{item.icon}</span>
            {!collapsed && (
              <span className="font-medium hidden md:block transition-opacity duration-200">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SidePanel;
