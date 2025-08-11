import { Home, History, BarChart3, Image as ImageIcon, Download, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

export function MobileTabBar() {
  const items = [
    { title: "Today", url: "/", icon: Home },
    { title: "History", url: "/history", icon: History },
    { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
    { title: "Photos", url: "/photos", icon: ImageIcon },
    { title: "Export", url: "/export", icon: Download },
  ];

  return (
    <nav aria-label="Bottom navigation" className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 md:hidden">
      <ul className="grid grid-cols-5">
        {items.map((item) => (
          <li key={item.title}>
            <NavLink
              to={item.url}
              end
              className={({ isActive }) =>
                `flex h-14 flex-col items-center justify-center text-xs ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="mt-1">{item.title}</span>
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink to="/settings" end className={({ isActive }) => `flex h-14 flex-col items-center justify-center text-xs ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            <Settings className="h-5 w-5" />
            <span className="mt-1">Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
