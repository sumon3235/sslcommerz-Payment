import { Link, Outlet, useLocation } from "react-router";

const MainLayout = () => {
    const { pathname } = useLocation();

    const linkClass = (path) =>
        `flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
            pathname === path
                ? "bg-indigo-50 text-indigo-700 border-indigo-400 shadow-[0_0_16px_rgba(99,102,241,0.3)]"
                : "text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-800 hover:border-indigo-300 hover:shadow-[0_0_12px_rgba(99,102,241,0.18)]"
        }`;

    return (
        <div>
            {/* Sticky Navbar */}
            <nav className="sticky top-0 z-50 flex items-center gap-3 px-8 h-16 bg-white border-b border-slate-100">
                <Link to="/addItem" className={linkClass("/addItem")}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Item
                </Link>

                <Link to="/allItems" className={linkClass("/allItems")}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    All Items
                </Link>
            </nav>

            {/* Page Content */}
            <Outlet />
        </div>
    );
};

export default MainLayout;