
type DesktopSidebarProps = {
    session: {
        user: {
            email?: string | null;
        };
    };
    pathname: string;
    navItems: {
        name: string;
        href: string;
        icon: React.ReactNode;
    }[];
    handleLogout: () => void;   
};

import { LogOut, ChevronDown } from "lucide-react";

 const DesktopSidebar = ({ session, pathname, navItems, handleLogout }: DesktopSidebarProps) => (
    <aside className="hidden md:flex flex-col w-64 bg-gray-900 border-r border-gray-800 min-h-screen">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white text-xl">AP</span>
          </div>
          <div>
            <h1 className="font-bold text-white text-lg">Admin Panel</h1>
            <p className="text-gray-400 text-xs">Professional Dashboard</p>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <span className="font-bold text-white text-lg">{session.user.email?.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-white truncate">{session.user.email}</p>
            <p className="text-gray-400 text-sm">Administrator</p>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Navigation
        </div>
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              pathname === item.href
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white hover:pl-5'
            }`}
          >
            <div className={`${pathname === item.href ? 'text-white' : 'text-gray-400'}`}>
              {item.icon}
            </div>
            <span className="font-medium">{item.name}</span>
          </a>
        ))}
      </nav>

      {/* Logout Section */}
      <div className="p-6 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gray-800 hover:bg-red-600 text-white rounded-xl transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          <LogOut size={18} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );

    export default DesktopSidebar;