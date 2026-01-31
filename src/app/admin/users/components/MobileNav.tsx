import { LogOut, X } from "lucide-react";


type MobileNavProps = {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (isOpen: boolean) => void;
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



const MobileNav = ({ isMobileMenuOpen, setIsMobileMenuOpen, session, pathname, navItems, handleLogout }: MobileNavProps) => (
  <div
    className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
  >
    <div
      className={`absolute left-0 top-0 h-full w-64 bg-gray-900 transform transition-transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="font-bold text-white">A</span>
          </div>
          <span className="font-bold text-white">Admin Panel</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>

      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="font-bold text-white">
              {session.user.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-white text-sm">Welcome back,</p>
            <p className="text-gray-300 text-xs truncate max-w-[180px]">
              {session.user.email}
            </p>
          </div>
        </div>
      </div>

      <nav className="p-2 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
              pathname === item.href
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.icon}
            <span>{item.name}</span>
          </a>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </div>
);

export default MobileNav;
