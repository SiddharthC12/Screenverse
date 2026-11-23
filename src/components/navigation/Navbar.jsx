import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Film, Compass, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BRAND, MOVIE_GENRES } from '../../utils/constants';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setGenreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setGenreDropdownOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/explore?search=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch('');
      setIsSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinkClasses = ({ isActive }) =>
    `relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
      isActive
        ? 'text-gold bg-charcoal/80 border border-charcoal-border shadow-sm'
        : 'text-ivory/80 hover:text-ivory hover:bg-charcoal/40'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full bg-midnight/90 backdrop-blur-md border-b border-charcoal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-charcoal border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:shadow-gold-glow transition-all duration-300">
              <Film className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-wider text-ivory group-hover:text-gold transition-colors duration-200">
                {BRAND.NAME}
              </span>
              <span className="hidden sm:block text-[10px] tracking-widest uppercase text-muted font-medium">
                {BRAND.TAGLINE}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={navLinkClasses}>
              <span>Home</span>
            </NavLink>

            <NavLink to="/explore" className={navLinkClasses}>
              <Compass className="w-4 h-4" />
              <span>Explore</span>
            </NavLink>

            {/* Genres Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  genreDropdownOpen
                    ? 'text-gold bg-charcoal/80'
                    : 'text-ivory/80 hover:text-ivory hover:bg-charcoal/40'
                }`}
                aria-expanded={genreDropdownOpen}
              >
                <span>Genres</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    genreDropdownOpen ? 'rotate-180 text-gold' : ''
                  }`}
                />
              </button>

              {genreDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-charcoal border border-charcoal-border rounded-xl shadow-cinematic py-2 z-50 grid grid-cols-2 gap-1 px-2 animate-fade-in">
                  {MOVIE_GENRES.filter((g) => g !== 'All').map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        navigate(`/explore?genre=${encodeURIComponent(g)}`);
                        setGenreDropdownOpen(false);
                      }}
                      className="text-left px-2.5 py-1.5 text-xs rounded-lg text-ivory/80 hover:text-gold hover:bg-midnight/60 transition-colors"
                    >
                      {g}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Search bar & Profile */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {/* Quick search input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search movies, directors..."
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                className="w-48 lg:w-64 pl-9 pr-3 py-1.5 rounded-lg bg-charcoal border border-charcoal-border text-xs text-ivory placeholder-muted focus:outline-none focus:border-gold focus:w-72 transition-all duration-200"
              />
              <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>

            {/* Profile Avatar / Link */}
            <Link
              to="/profile"
              className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-lg bg-charcoal border border-charcoal-border hover:border-gold/50 text-ivory/90 hover:text-gold transition-colors text-xs font-medium group"
              title="Your Movie Profile"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden bg-gold/15 border border-gold/40 flex items-center justify-center flex-shrink-0">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.displayName} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-3.5 h-3.5 text-gold" />
                )}
              </div>
              <span className="hidden lg:inline group-hover:text-gold font-medium">
                {user?.displayName || 'Profile'}
              </span>
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg bg-charcoal text-ivory hover:text-gold border border-charcoal-border"
              aria-label="Toggle search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-charcoal text-ivory hover:text-gold border border-charcoal-border"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {isSearchOpen && (
          <div className="md:hidden pb-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Search movies..."
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-charcoal border border-charcoal-border text-sm text-ivory placeholder-muted focus:outline-none focus:border-gold"
              />
              <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-charcoal-border bg-charcoal-card/95 backdrop-blur-lg px-4 pt-3 pb-5 space-y-2">
          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkClasses}
          >
            <Film className="w-4 h-4" />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkClasses}
          >
            <Compass className="w-4 h-4" />
            <span>Explore Movies</span>
          </NavLink>
          <NavLink
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkClasses}
          >
            <User className="w-4 h-4 text-gold" />
            <span>Profile ({user?.displayName || 'Arjun Sharma'})</span>
          </NavLink>

          <div className="pt-2 border-t border-charcoal-border/70">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted px-2 py-1">
              Browse by Genre
            </p>
            <div className="grid grid-cols-2 gap-1 pt-1">
              {MOVIE_GENRES.filter((g) => g !== 'All').map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    navigate(`/explore?genre=${encodeURIComponent(g)}`);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-2 py-1.5 text-xs rounded text-ivory/80 hover:text-gold hover:bg-midnight"
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
