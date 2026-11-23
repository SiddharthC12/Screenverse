import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';
import RootLayout from './layouts/RootLayout';
import { Film } from 'lucide-react';

// Lazy-loaded route views for optimal bundle performance
const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Elegant cinematic fallback loader
const PageLoader = () => (
  <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
    <div className="w-12 h-12 rounded-2xl bg-charcoal border border-gold/40 flex items-center justify-center animate-pulse mb-3">
      <Film className="w-6 h-6 text-gold" />
    </div>
    <span className="text-xs uppercase tracking-widest text-muted font-medium">Loading Feature...</span>
  </div>
);

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MovieProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="explore" element={<Explore />} />
                <Route path="movie/:id" element={<MovieDetails />} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </MovieProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
