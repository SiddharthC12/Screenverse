import { Link } from 'react-router-dom';
import { Film, Heart, Sparkles } from 'lucide-react';
import { BRAND } from '../../utils/constants';

export const Footer = () => {
  return (
    <footer className="w-full bg-midnight border-t border-charcoal-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-charcoal-border/60">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 group inline-flex">
              <div className="w-8 h-8 rounded-lg bg-charcoal border border-gold/40 flex items-center justify-center group-hover:border-gold transition-colors">
                <Film className="w-4 h-4 text-gold" />
              </div>
              <span className="font-display text-lg font-bold tracking-wider text-ivory group-hover:text-gold transition-colors">
                {BRAND.NAME}
              </span>
            </Link>
            <p className="text-xs text-gold/90 font-medium">
              {BRAND.TAGLINE}
            </p>
            <p className="text-xs text-muted leading-relaxed">
              A curated cinema discovery and review destination celebrating the world&apos;s greatest films, timeless storytelling, and passionate community dialogue.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ivory">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-gold transition-colors">
                  Complete Film Collection
                </Link>
              </li>
              <li>
                <Link to="/explore?genre=Science+Fiction" className="hover:text-gold transition-colors">
                  Sci-Fi &amp; Fantasy
                </Link>
              </li>
              <li>
                <Link to="/explore?genre=Action" className="hover:text-gold transition-colors">
                  Action &amp; Adventure
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-gold transition-colors">
                  Your Movie Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Cinema Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ivory">
              Curated Collections
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link to="/explore?collection=Hollywood+Action+%26+Adventure" className="hover:text-gold transition-colors">
                  Hollywood Action &amp; Adventure
                </Link>
              </li>
              <li>
                <Link to="/explore?collection=Bollywood" className="hover:text-gold transition-colors">
                  Bollywood Masterpieces
                </Link>
              </li>
              <li>
                <Link to="/explore?collection=Telugu+%26+Tamil+Cinema" className="hover:text-gold transition-colors">
                  Telugu &amp; Tamil Cinema
                </Link>
              </li>
              <li>
                <Link to="/explore?collection=Malayalam+%26+Kannada+Cinema" className="hover:text-gold transition-colors">
                  Malayalam &amp; Kannada Cinema
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Philosophy & Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ivory">
              Join the Community
            </h4>
            <div className="p-3.5 rounded-xl bg-charcoal border border-charcoal-border text-xs text-muted space-y-2">
              <div className="flex items-center gap-1.5 text-gold font-medium">
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Passionate Film Reviews</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Explore insightful community ratings, thoughtful critical reflections, and share your personal perspective on the movies that move you.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} {BRAND.NAME}. Academic non-commercial demonstration.</p>
          <p className="inline-flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-gold fill-gold" /> for cinema enthusiasts worldwide.
          </p>
        </div>
        <p className="text-[10px] text-muted/60 text-center sm:text-left mt-2">
          Movie posters, artwork, and film metadata remain the intellectual property of their respective production studios and distributors. Sourced via Wikimedia Commons under educational commentary principles.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
