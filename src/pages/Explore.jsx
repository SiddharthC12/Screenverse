import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Compass,
  Filter,
  X,
  Film,
  RotateCcw,
} from 'lucide-react';
import MovieCard from '../components/movies/MovieCard';
import {
  filterMovies,
  getAvailableGenres,
  getAvailableLanguages,
  getAvailableYears,
} from '../services/movieService';
import { MOVIE_COLLECTIONS } from '../utils/constants';

export const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial filter values from URL or defaults
  const initialSearch = searchParams.get('search') || '';
  const initialGenre = searchParams.get('genre') || 'All';
  const initialLanguage = searchParams.get('language') || 'All';
  const initialCollection = searchParams.get('collection') || 'All Collections';
  const initialSortBy = searchParams.get('sortBy') || 'rating';
  const initialSortOrder = searchParams.get('sortOrder') || 'desc';
  const initialYear = searchParams.get('year') || 'All';

  const [search, setSearch] = useState(initialSearch);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync state if URL searchParams change externally
  useEffect(() => {
    const qSearch = searchParams.get('search') || '';
    const qGenre = searchParams.get('genre') || 'All';
    const qLanguage = searchParams.get('language') || 'All';
    const qCollection = searchParams.get('collection') || 'All Collections';
    const qSortBy = searchParams.get('sortBy') || 'rating';
    const qYear = searchParams.get('year') || 'All';

    setSearch(qSearch);
    setSelectedGenre(qGenre);
    setSelectedLanguage(qLanguage);
    setSelectedCollection(qCollection);
    setSortBy(qSortBy);
    setSelectedYear(qYear);
  }, [searchParams]);

  const genres = getAvailableGenres();
  const languages = getAvailableLanguages();
  const years = getAvailableYears();

  // Query filtered movies using service layer
  const filteredMovies = useMemo(() => {
    return filterMovies({
      search,
      genre: selectedGenre,
      language: selectedLanguage,
      year: selectedYear,
      collection: selectedCollection,
      sortBy,
      sortOrder,
    });
  }, [search, selectedGenre, selectedLanguage, selectedYear, selectedCollection, sortBy, sortOrder]);

  // Update URL parameters
  const updateParams = (newParams) => {
    const current = Object.fromEntries(searchParams.entries());
    const merged = { ...current, ...newParams };

    // Clean defaults
    Object.keys(merged).forEach((k) => {
      if (!merged[k] || merged[k] === 'All' || merged[k] === 'All Collections') {
        delete merged[k];
      }
    });

    setSearchParams(merged, { replace: true });
  };

  const handleSearchChange = (val) => {
    setSearch(val);
    updateParams({ search: val });
  };

  const handleGenreChange = (g) => {
    setSelectedGenre(g);
    updateParams({ genre: g });
  };

  const handleLanguageChange = (l) => {
    setSelectedLanguage(l);
    updateParams({ language: l });
  };

  const handleCollectionChange = (c) => {
    setSelectedCollection(c);
    updateParams({ collection: c });
  };

  const handleYearChange = (y) => {
    setSelectedYear(y);
    updateParams({ year: y });
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    setSortBy(val);
    updateParams({ sortBy: val });
  };

  const clearAllFilters = () => {
    setSearch('');
    setSelectedGenre('All');
    setSelectedLanguage('All');
    setSelectedCollection('All Collections');
    setSelectedYear('All');
    setSortBy('rating');
    setSortOrder('desc');
    setSearchParams({}, { replace: true });
  };

  const isFiltered =
    search.trim() !== '' ||
    selectedGenre !== 'All' ||
    selectedLanguage !== 'All' ||
    selectedCollection !== 'All Collections' ||
    selectedYear !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full min-h-[80vh] flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold mb-1.5">
            <Compass className="w-4 h-4" />
            <span>Complete Catalogue</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ivory">
            Explore the Film Collection
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Discover movies by title, director, genre, language, and release year.
          </p>
        </div>

        {/* Live Counter & Reset Button */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-lg bg-charcoal border border-charcoal-border text-xs font-medium text-ivory">
            Showing <strong className="text-gold">{filteredMovies.length}</strong> titles
          </div>

          {isFiltered && (
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-charcoal hover:bg-charcoal-hover border border-charcoal-border text-xs text-muted hover:text-gold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Bar & Primary Controls */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by movie title, director, or synopsis..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-charcoal border border-charcoal-border text-ivory placeholder-muted text-sm focus:outline-none focus:border-gold transition-colors"
            />
            {search && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ivory"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="sm:w-52 flex-shrink-0">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal border border-charcoal-border text-ivory text-sm focus:outline-none focus:border-gold transition-colors cursor-pointer"
            >
              <option value="rating">Highest Rated</option>
              <option value="year">Release Year (Newest)</option>
              <option value="title">Title (A - Z)</option>
            </select>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="sm:hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-charcoal border border-charcoal-border text-sm text-ivory font-medium"
          >
            <Filter className="w-4 h-4 text-gold" />
            <span>Filters ({isFiltered ? 'Active' : 'All'})</span>
          </button>
        </div>

        {/* Secondary Filters Bar (Language, Collection, Year) */}
        <div
          className={`${
            mobileFiltersOpen ? 'block' : 'hidden'
          } sm:flex flex-wrap items-center gap-3 pt-1 text-xs`}
        >
          {/* Collection Filter */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedCollection}
              onChange={(e) => handleCollectionChange(e.target.value)}
              className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-charcoal border border-charcoal-border text-ivory text-xs focus:outline-none focus:border-gold cursor-pointer"
            >
              {MOVIE_COLLECTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-charcoal border border-charcoal-border text-ivory text-xs focus:outline-none focus:border-gold cursor-pointer"
            >
              {languages.map((l) => (
                <option key={l} value={l}>
                  Language: {l}
                </option>
              ))}
            </select>
          </div>

          {/* Release Year Filter */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
              className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-charcoal border border-charcoal-border text-ivory text-xs focus:outline-none focus:border-gold cursor-pointer"
            >
              <option value="All">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  Year: {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Horizontal Genre Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none pt-1">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreChange(genre)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                selectedGenre === genre
                  ? 'bg-gold text-midnight border-gold shadow-sm font-semibold'
                  : 'bg-charcoal border-charcoal-border text-ivory-muted hover:border-gold/50 hover:text-ivory'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="card-cinematic p-12 text-center my-12 max-w-md mx-auto">
          <Film className="w-12 h-12 text-muted mx-auto mb-4" />
          <h3 className="font-display text-xl font-bold text-ivory mb-2">No Movies Found</h3>
          <p className="text-xs text-muted mb-6 leading-relaxed">
            No films match your search or filter criteria. Try clearing some filters or searching with a different term.
          </p>
          <button onClick={clearAllFilters} className="btn-gold !text-xs !py-2">
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Explore;
