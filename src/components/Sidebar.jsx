import { LayoutDashboard, LogOutIcon, UserCheck } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar({ setIsLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 z-50 h-9 w-9 rounded-lg flex items-center justify-center
          text-lg
          transition-all duration-300
          ${
            isOpen
              ? "left-[215px] bg-slate-200 text-slate-700 border border-slate-400"
              : "left-4 bg-slate-300 text-slate-700 border border-slate-400"
          }
          md:hidden
        `}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        ></div>
      )}

      <aside
        className={`
          fixed left-0 top-0 z-40
          h-screen w-64
          bg-slate-100 text-black
          p-5
          border-r border-slate-400
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex items-center gap-3 mb-10">
          <span className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-blue-400 text-white flex items-center justify-center font-semibold">
            SD
          </span>
          <h1 className="text-2xl font-bold text-slate-800">ServiceDesk</h1>
        </div>

        <nav className="space-y-2 ">
          <Link
            to="/dashboard"
            onClick={closeSidebar}
            className={` flex items-center gap-3
               rounded-lg px-3 py-3
              ${
                location.pathname === "/dashboard"
                  ? "bg-blue-200"
                  : "hover:bg-slate-300"
              }
            `}
          >
            <LayoutDashboard size={20} className="text-blue-400" />
            <span>Dashboard</span>{" "}
          </Link>

          <Link
            to="/customers"
            onClick={closeSidebar}
            className={`rounded-lg px-4 py-3 flex items-center gap-3
              ${
                location.pathname === "/customers"
                  ? "bg-blue-200"
                  : "hover:bg-slate-300"
              }
            `}
          >
            <UserCheck className="text-blue-400" /> Customers
          </Link>
        </nav>

        <div className="absolute bottom-5 left-5 right-5 ">
          <button
            onClick={handleLogout}
            className="
              w-full
              rounded-lg
              px-4 py-3
              text-left
              text-red-500
              hover:bg-red-50
              hover:text-red-600 flex items-center gap-3
            "
          >
            <LogOutIcon size={20} /> <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
