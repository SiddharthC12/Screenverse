# SCREENVERSE – Discover. Rate. Review.

> **SCREENVERSE** is a modern, high-performance movie discovery, rating, and review web application developed as a showcase college mini-project. It pairs a premium cinematic dark aesthetic with a clean, modular frontend architecture, housing 70 curated films across 7 distinct cinema traditions, 560 in-depth community sample reviews, and fully interactive user review capabilities.

---

## 1. Project Overview & Brand Identity

SCREENVERSE provides film lovers with an elegant, responsive platform to discover curated cinema across diverse genres, languages, and eras. The application allows users to explore detailed film synopses, browse community and critic reviews, submit their own ratings and critiques, view dynamic separated rating metrics (out of 10), and interact with a fully populated cinephile profile.

### Core Identity & Branding
- **Name**: SCREENVERSE
- **Tagline**: Discover. Rate. Review.
- **Headline**: Discover Your Next Favourite Movie.
- **Supporting Text**: Explore cinema, share your thoughts and rate the movies you love.
- **Theme**: Premium Cinematic Dark Aesthetic
- **Color Palette**:
  - **Midnight Black**: `#101116` (Deep cinematic canvas)
  - **Charcoal**: `#1D2028` (Card and panel surfaces)
  - **Champagne Gold**: `#C9A45C` (Primary accents and rating stars)
  - **Light Gold**: `#E5BE72` (Glows, hover states, and interactive accents)
  - **Ivory**: `#F5F3EE` (Primary readable typography)
  - **Muted Grey**: `#85858F` (Secondary metadata and labels)
- **Typography**:
  - `Plus Jakarta Sans` for clean, modern interface text.
  - `Cinzel` for cinematic headlines and brand emblems.

---

## 2. Key Architecture & Features

- **Pure Frontend Architecture**: Lightweight single-page application requiring zero backend servers, external databases (no Firebase, Supabase, or SQL), or third-party authentication providers.
- **Curated 70-Film Local Collection**: Exactly 70 hand-curated movies with 100% locally stored posters in `public/images/movies/`.
- **Predefined Review Dataset (560 Reviews)**: Exactly 8 in-depth, diverse critic and community reviews per film stored in `src/data/sampleReviews.json`. Predefined reviews are immutable and protected from deletion or modification.
- **Interactive Review & Rating System**: Logged-in users can submit reviews with ratings from 1.0 to 10.0 (in 0.5 increments), headlines, and detailed critique text.
- **Duplicate Prevention**: Strictly restricts users to one active review per movie. Attempting duplicate submissions displays a friendly notice and highlights the user's existing review.
- **Edit & Delete Reviews**: Users can update their ratings, headlines, and critiques, or delete them with a confirmation modal (`ConfirmModal`). Deletion immediately restores the submission form for that film.
- **Dual Category Rating Metrics**: Avoids combining synthetic and real ratings into a misleading score. Maintains separate **Community Sample Rating** (calculated from the 8 predefined reviews) and **User Rating** (calculated exclusively from user-submitted reviews).
- **Default Demonstration Profile**: Fictional cinephile profile for **Arjun Sharma** (`@arjunsharma`), complete with a non-human golden film-reel emblem avatar, dynamic statistics, editable profile fields, and real-time reflection of user review activity.
- **Responsive & Accessible**: Seamlessly adapts to mobile phones (360px+), tablets, laptops, and ultra-wide desktop monitors with reduced-motion accessibility support.

---

## 3. Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework & Tooling** | [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) | High-performance SPA with route-based code splitting (`React.lazy` + `Suspense`) |
| **Language** | JavaScript (ESModules) | Clean, modern, standard JavaScript |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) + PostCSS + Autoprefixer | Utility-first styling with custom cinematic design tokens |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) | Client-side routing with nested layouts, dynamic routes (`/movie/:id`), and search query params |
| **Icons** | [Lucide React](https://lucide.dev/) | Crisp, lightweight vector iconography |
| **Animations** | [Motion](https://motion.dev/) / CSS3 Transitions | Hardware-accelerated UI transitions |
| **Data & State** | Local JSON + LocalStorage + Context API | Modular static data services and reactive global state |
| **Deployment Target** | [Vercel](https://vercel.com/) | Static edge hosting with SPA rewrite rules (`vercel.json`) |

---

## 4. The Curated 70-Movie Collection

The SCREENVERSE catalogue features exactly 70 iconic films organized across 7 distinct cinema collections:

1. **Hollywood Action & Adventure (10 Films)**: *The Dark Knight (2008), Avengers: Endgame (2019), Mad Max: Fury Road (2015), Jurassic Park (1993), Pirates of the Caribbean: The Curse of the Black Pearl (2003), Mission: Impossible – Fallout (2018), Top Gun: Maverick (2022), Gladiator (2000), Spider-Man: No Way Home (2021), The Batman (2022)*
2. **Sci-Fi & Fantasy (10 Films)**: *Inception (2010), Interstellar (2014), The Matrix (1999), Dune: Part Two (2024), Arrival (2016), Blade Runner 2049 (2017), Harry Potter and the Philosopher's Stone (2001), The Lord of the Rings: The Fellowship of the Ring (2001), Everything Everywhere All at Once (2022), Avatar (2009)*
3. **Thriller, Mystery & Horror (10 Films)**: *Se7en (1995), Shutter Island (2010), Gone Girl (2014), Knives Out (2019), The Silence of the Lambs (1991), Get Out (2017), The Conjuring (2013), A Quiet Place (2018), Parasite (2019), Train to Busan (2016)*
4. **Drama, Romance & Animation (10 Films)**: *The Shawshank Redemption (1994), Forrest Gump (1994), The Pursuit of Happyness (2006), Whiplash (2014), The Green Mile (1999), Titanic (1997), La La Land (2016), The Grand Budapest Hotel (2014), Coco (2017), Inside Out (2015)*
5. **Bollywood Cinema (10 Films)**: *3 Idiots (2009), Dangal (2016), Lagaan (2001), Zindagi Na Milegi Dobara (2011), Andhadhun (2018), Queen (2013), Gully Boy (2019), Taare Zameen Par (2007), Bajrangi Bhaijaan (2015), Drishyam (2015 – Hindi)*
6. **Telugu & Tamil Cinema (10 Films)**: *RRR (2022), Baahubali 2: The Conclusion (2017), Pushpa: The Rise (2021), KGF Chapter 2 (2022), Kantara (2022), Eega (2012), Sita Ramam (2022), Mahanati (2018), Vikram (2022), 96 (2018)*
7. **Malayalam & Kannada Cinema (10 Films)**: *Drishyam (2013 – Malayalam), Manjummel Boys (2024), Premam (2015), Bangalore Days (2014), Kumbalangi Nights (2019), Ustad Hotel (2012), Charlie (2015 – Malayalam), Kirik Party (2016), Lucia (2013 – Kannada), Dia (2020 – Kannada)*

---

## 5. Demonstration Profile: Arjun Sharma

The application pre-populates a demonstration community member profile:
- **Display Name**: Arjun Sharma
- **Username**: `@arjunsharma`
- **Email**: `arjun.sharma@example.com`
- **Location**: Bengaluru, India
- **Membership**: SCREENVERSE Member
- **Member Since**: October 2024
- **Favourite Genres**: Sci-Fi, Thriller, Action, Drama
- **Bio**: *"Passionate film archivist, cinephile, and community reviewer."*
- **Avatar**: Non-human circular golden film-reel emblem (`/images/branding/film-reel-avatar.svg`). No human portraits or photographs are used.
- **Dynamic Stats**: Calculates total reviews published, average rating given, and recently reviewed titles with direct links to film pages.

---

## 6. Project Folder Structure

```text
SCREENVERSE/
├── public/
│   ├── favicon.svg                   # Brand favicon
│   ├── icons.svg                     # Vector symbols
│   └── images/
│       ├── branding/
│       │   └── film-reel-avatar.svg  # Non-human golden film reel avatar
│       └── movies/                   # 70 localized movie posters (.jpg)
│           └── manifest.json         # Complete provenance & attribution manifest
├── scripts/
│   ├── audit_data_and_licensing.py   # Data integrity & licensing audit suite
│   ├── generate_expanded_reviews.py  # Review dataset generator
│   └── test_stage6.py                # Automated QA test suite (630 assertions)
├── src/
│   ├── assets/                       # Static graphics
│   ├── components/
│   │   ├── common/
│   │   │   ├── ConfirmModal.jsx      # Cinematic delete confirmation modal
│   │   │   └── StarRating.jsx        # Star rating renderer
│   │   ├── movies/
│   │   │   ├── MovieCard.jsx         # Movie card with lazy poster loading
│   │   │   └── MovieGrid.jsx         # Responsive movie grid layout
│   │   ├── navigation/
│   │   │   ├── Navbar.jsx            # Sticky cinematic navbar with search & mobile menu
│   │   │   └── Footer.jsx            # Cinematic footer with educational disclaimer
│   │   └── reviews/
│   │       ├── RatingInput.jsx       # Interactive 1-10 rating selector
│   │       └── ReviewForm.jsx        # Validated review submission & edit form
│   ├── context/
│   │   ├── AuthContext.jsx           # Profile state & persistence provider
│   │   └── MovieContext.jsx          # Movie catalogue provider
│   ├── data/
│   │   ├── movies.json               # Curated 70-movie JSON dataset
│   │   └── sampleReviews.json        # 560 predefined community reviews (8 per film)
│   ├── layouts/
│   │   └── RootLayout.jsx            # Master layout wrapper with zero horizontal overflow
│   ├── pages/
│   │   ├── Home.jsx                  # Homepage with hero spotlight and carousels
│   │   ├── Explore.jsx               # Multi-filter catalogue search & sorting
│   │   ├── MovieDetails.jsx          # Film details, dual ratings, and interactive reviews
│   │   ├── Profile.jsx               # Arjun Sharma's profile & review management
│   │   └── NotFound.jsx              # Custom 404 cinematic error page
│   ├── services/
│   │   ├── movieService.js           # Catalogue filtering, search, and sorting service
│   │   ├── profileService.js         # Profile migration, retrieval, and updates
│   │   └── reviewService.js          # Review CRUD, dual rating stats, and duplicate guards
│   ├── styles/
│   │   └── globals.css               # Tailwind directives and custom utility components
│   ├── utils/
│   │   ├── constants.js              # Brand identity, default user, and genre constants
│   │   ├── formatters.js             # Runtime, date, and score formatters
│   │   └── storage.js                # Safe LocalStorage wrapper with error handling
│   ├── App.jsx                       # Code-split router configuration
│   └── main.jsx                      # Application entry point
├── .gitignore                        # Git exclusion rules
├── index.html                        # HTML entry point with Plus Jakarta Sans & Cinzel fonts
├── package.json                      # Project dependencies & npm scripts
├── postcss.config.js                 # PostCSS configuration
├── tailwind.config.js                # Custom Tailwind design tokens
├── vercel.json                       # Vercel SPA routing configuration
└── vite.config.js                    # Vite bundler configuration
```

---

## 7. Installation, Development & Build Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The application will launch locally at `http://localhost:5173/`.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized, minified production build in the `dist/` directory with route-based chunking.

### 4. Preview Production Build Locally
```bash
npm run preview
```
Serves the compiled `dist/` production assets locally for verification.

---

## 8. Deployment Preparation (Vercel)

SCREENVERSE is configured for static edge deployment on [Vercel](https://vercel.com/):

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Rewrites**: Defined in [`vercel.json`](file:///c:/Users/csidd/OneDrive/Desktop/SCREENVERSE/vercel.json):
  ```json
  {
    "rewrites": [
      {
        "source": "/(.*)",
        "destination": "/index.html"
      }
    ]
  }
  ```
  This ensures direct navigation or page refresh on `/explore`, `/profile`, or `/movie/:id` routes serves `index.html` without triggering 404 errors.

---

## 9. Image Licensing, Attribution & Academic Disclaimer

### Academic Non-Commercial Nature
SCREENVERSE is developed exclusively as a **college mini-project for academic and educational evaluation**.

### Image Attribution & Rights
- All 70 movie posters stored in `public/images/movies/` represent promotional artwork owned by their respective film production studios and distribution companies (including Warner Bros., Universal Pictures, Walt Disney Studios, Sony Pictures, Paramount Pictures, A24, and Indian regional production houses).
- The posters were sourced via **Wikimedia Commons / Wikipedia** under the United States doctrine of **Fair Use** (17 U.S.C. § 107) for non-commercial educational critique and review.
- Fair use is an educational legal defence, not an open redistribution license.
- Detailed file provenance, source URLs, and attribution entities are comprehensively documented in [`public/images/movies/manifest.json`](file:///c:/Users/csidd/OneDrive/Desktop/SCREENVERSE/public/images/movies/manifest.json).
- **Public / Commercial Notice**: Any future commercial deployment of this application outside academic evaluation would require replacing these promotional posters with licensed media (e.g. via The Movie Database (TMDb) API) or obtaining explicit distributor permissions.

---

## 10. License

This project is licensed under the **MIT License** for all original software code. All movie posters, titles, synopses, and trademarks remain the property of their respective copyright holders.
