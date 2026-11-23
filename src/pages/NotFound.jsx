import { Link } from 'react-router-dom';
import { Film, Home as HomeIcon } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="w-16 h-16 rounded-2xl bg-charcoal border border-charcoal-border flex items-center justify-center mb-6">
        <Film className="w-8 h-8 text-gold" />
      </div>
      <span className="text-xs uppercase tracking-widest text-gold font-bold mb-2">404 Error</span>
      <h1 className="font-display text-4xl sm:text-5xl font-bold text-ivory mb-4">
        Page Not Found
      </h1>
      <p className="text-sm text-muted max-w-md mb-8">
        The cinematic feature you are looking for does not exist or has been relocated.
      </p>
      <Link to="/" className="btn-gold">
        <HomeIcon className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
