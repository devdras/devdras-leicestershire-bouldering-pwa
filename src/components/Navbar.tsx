import type React from "react";
import { useState, useEffect } from "react";
import { Menu, X, Mountain, Search } from "lucide-react";

interface NavLink {
  name: string;
  path: string;
}

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Navigation links array
  const navLinks: NavLink[] = [
    { name: "Home", path: "/" },
    { name: "Areas", path: "/areas" },
    { name: "Map", path: "/map" },
    { name: "About", path: "/about" },
  ];

  // Update current path when component mounts and when URL changes
  useEffect(() => {
    const updateCurrentPath = () => {
      setCurrentPath(window.location.pathname);
    };

    // Set initial path
    updateCurrentPath();

    // Listen for URL changes (for single-page apps)
    window.addEventListener("popstate", updateCurrentPath);

    return () => {
      window.removeEventListener("popstate", updateCurrentPath);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // You can access currentPath here to know which page the search was initiated from
    console.log(`Searching for "${searchQuery}" from page: ${currentPath}`);

    // Implement your search logic here
    // For example, you could redirect to a search results page:
    // window.location.href = `/search?q=${encodeURIComponent(searchQuery)}&from=${encodeURIComponent(currentPath)}`;

    // Or you could pass the search query to a parent component via props/context
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Navbar */}
      <header className="bg-slate-800 text-white shadow-md relative z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Site Name */}
            <div className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-amber-500" />
              <a href="/" className="text-xl font-bold">
                Leicestershire Bouldering
              </a>
            </div>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center relative mx-4 flex-grow max-w-md"
            >
              <input
                type="text"
                placeholder="Search routes, areas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-1 px-3 pr-10 rounded text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="absolute right-2 text-slate-500 hover:text-slate-700"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Desktop Navigation - hidden on mobile */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className={`hover:text-amber-400 transition-colors ${
                    currentPath === link.path
                      ? "text-amber-400 font-medium"
                      : ""
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Hamburger Menu Button - visible only on mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md hover:bg-slate-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - overlay instead of pushing content down */}
        <div
          className={`absolute top-full left-0 right-0 bg-slate-700 shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
          style={{
            zIndex: 40,
            visibility: isMenuOpen ? "visible" : "hidden",
            transitionProperty: "transform, opacity, visibility",
            transitionDelay: isMenuOpen ? "0s" : "0s, 0s, 0.3s",
          }}
        >
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="px-4 pt-3 pb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search routes, areas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 px-3 pr-10 rounded text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Mobile Navigation */}
          <nav className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`px-2 py-1 hover:bg-slate-600 rounded transition-colors ${
                  currentPath === link.path ? "bg-slate-600 font-medium" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-4 text-center text-sm">
        <div className="container mx-auto px-4">
          <p>
            © {new Date().getFullYear()} Leicestershire Bouldering. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Navbar;
