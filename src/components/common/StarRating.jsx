import { Star } from 'lucide-react';

/**
 * StarRating component supporting 1-10 numerical ratings converted to 5 visual stars
 * @param {Object} props
 * @param {number} props.rating - Rating out of 10
 * @param {number} [props.maxStars=5] - Number of stars to render
 * @param {string} [props.size='sm'] - 'xs' | 'sm' | 'md' | 'lg'
 * @param {boolean} [props.showNumber=true] - Display numerical rating
 * @param {boolean} [props.isTenScale=true] - If true, number displays /10
 */
export const StarRating = ({
  rating = 0,
  maxStars = 5,
  size = 'sm',
  showNumber = true,
  isTenScale = true,
  className = '',
}) => {
  const numericRating = Number(rating) || 0;
  // Convert 10-scale to 5-scale for visual stars
  const normalized = isTenScale ? numericRating / 2 : numericRating;

  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm font-semibold',
    lg: 'text-base font-bold',
  };

  const starSize = sizeClasses[size] || sizeClasses.sm;
  const textSize = textSizes[size] || textSizes.sm;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${numericRating} out of 10`}>
        {Array.from({ length: maxStars }).map((_, index) => {
          const fillPercentage = Math.max(0, Math.min(1, normalized - index));
          
          if (fillPercentage >= 0.8) {
            // Full star
            return (
              <Star
                key={index}
                className={`${starSize} text-gold fill-gold transition-colors`}
              />
            );
          } else if (fillPercentage >= 0.3) {
            // Half star representation
            return (
              <div key={index} className="relative inline-block">
                <Star className={`${starSize} text-charcoal-border fill-charcoal`} />
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star className={`${starSize} text-gold fill-gold`} />
                </div>
              </div>
            );
          } else {
            // Empty star
            return (
              <Star
                key={index}
                className={`${starSize} text-charcoal-border/80 fill-charcoal/40`}
              />
            );
          }
        })}
      </div>

      {showNumber && (
        <span className={`${textSize} text-gold font-medium ml-0.5`}>
          {numericRating.toFixed(1)}
          {isTenScale && <span className="text-[10px] text-muted font-normal ml-0.5">/10</span>}
        </span>
      )}
    </div>
  );
};

export default StarRating;
