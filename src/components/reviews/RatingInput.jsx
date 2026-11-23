import { useState } from 'react';
import { Star } from 'lucide-react';

/**
 * Interactive rating selector supporting 1.0 to 10.0 ratings with 0.5 increments
 * @param {Object} props
 * @param {number} props.value - Current rating (1-10)
 * @param {Function} props.onChange - Callback with new rating
 */
export const RatingInput = ({ value = 8, onChange }) => {
  const [hoverValue, setHoverValue] = useState(null);

  const displayValue = hoverValue !== null ? hoverValue : value;

  const getLabel = (val) => {
    if (val >= 9.5) return 'Masterpiece';
    if (val >= 8.5) return 'Outstanding';
    if (val >= 7.5) return 'Very Good';
    if (val >= 6.5) return 'Good';
    if (val >= 5.0) return 'Average';
    if (val >= 3.0) return 'Mediocre';
    return 'Poor';
  };

  const handleSliderChange = (e) => {
    const val = parseFloat(e.target.value);
    onChange(val);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/90">
          Your Rating
        </label>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted">
            {getLabel(displayValue)}
          </span>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-midnight border border-gold/40 text-gold font-bold text-sm">
            <Star className="w-3.5 h-3.5 fill-gold" />
            <span>{displayValue.toFixed(1)}</span>
            <span className="text-[10px] text-muted font-normal">/ 10</span>
          </div>
        </div>
      </div>

      {/* Interactive slider with steps */}
      <div className="space-y-1">
        <input
          type="range"
          min="1"
          max="10"
          step="0.5"
          value={displayValue}
          onChange={handleSliderChange}
          onMouseEnter={() => setHoverValue(value)}
          onMouseLeave={() => setHoverValue(null)}
          className="w-full h-2 rounded-lg bg-midnight border border-charcoal-border appearance-none cursor-pointer accent-gold focus:outline-none"
        />
        <div className="flex justify-between text-[10px] text-muted px-0.5">
          <span>1.0</span>
          <span>3.0</span>
          <span>5.0</span>
          <span>7.0</span>
          <span>9.0</span>
          <span>10.0</span>
        </div>
      </div>

      {/* Quick Score Buttons */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {[6.0, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0].map((score) => (
          <button
            type="button"
            key={score}
            onClick={() => onChange(score)}
            className={`px-2 py-0.5 rounded text-xs font-medium transition-colors border ${
              value === score
                ? 'bg-gold text-midnight border-gold font-bold'
                : 'bg-midnight text-ivory/70 border-charcoal-border hover:border-gold/40 hover:text-gold'
            }`}
          >
            {score.toFixed(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingInput;
