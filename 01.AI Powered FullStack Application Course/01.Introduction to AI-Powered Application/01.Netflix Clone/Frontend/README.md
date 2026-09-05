# Netflix Clone — Frontend

A responsive Netflix-style frontend built with React 19, Vite, and Tailwind CSS v4, consuming the TMDB API for live movie and TV show data.

---

## Getting Started

```bash
# Install dependencies
npm install

# Create a .env file at the root of this folder
# VITE_TMDB_API_KEY=your_tmdb_api_key_here

# Start the dev server
npm run dev
```

> Get a free TMDB API key at [themoviedb.org](https://www.themoviedb.org/settings/api).

---

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Fixed nav: scroll effect, search, profile dropdown, mobile menu
│   ├── Banner.jsx          # Hero section with a random Netflix Original on every load
│   ├── SlideShow.jsx       # Swiper carousel row (title + movies[])
│   ├── SlideShow.module.css
│   ├── Card.jsx            # Movie card with hover-expand panel
│   └── Footer.jsx
├── utility/
│   ├── movieInstances.js   # Axios instance with TMDB base URL
│   └── requestUrl.js       # All 8 TMDB endpoint paths
├── Data/
│   └── Data.js             # Static seed data with local poster imports
├── assets/image/           # Local images: logo, banner, posters
├── App.jsx                 # Root: state, Promise.all fetch, layout tree
├── main.jsx                # React 19 createRoot entry point
└── index.css               # Global styles + Tailwind v4 import
```

---

## What I Learned

### React Hooks

**`useState`**
Used across multiple components to manage local UI state:
- `App.jsx` — a single state object holding 8 movie category arrays, all initialized to `[]`
- `Header.jsx` — 4 separate booleans: `isSearchOpen`, `isProfile`, `isScrolled`, `isMobileMenu`
- `Banner.jsx` — `bannerImage` stores the randomly selected Netflix Original from the API

**`useEffect`**
- `App.jsx` — fires once on mount (empty `[]` deps). Runs the full data fetch inside an async function. Empty deps ensures it never re-runs on re-renders.
- `Banner.jsx` — same pattern, but fetches independently for just the banner image.
- `Header.jsx` — attaches a `scroll` event listener to `window`. Returns a cleanup function that removes the listener, preventing memory leaks when the component unmounts:
  ```js
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // cleanup
  }, []);
  ```

---

### Parallel API Fetching with `Promise.all`

Instead of awaiting each request one by one (which would chain them sequentially), `App.jsx` fires all 8 TMDB calls at the same time and waits for all of them to resolve together. This means the page loads all categories in the time it takes for the slowest single request — not the sum of all 8.

```js
const [trendingRes, netflixRes, topRatedRes, actionRes, ...] = await Promise.all([
  movieInstances.get(requests.fetchTrending),
  movieInstances.get(requests.fetchNetflixOriginals),
  movieInstances.get(requests.fetchTopRatedMovies),
  // ...5 more
]);
```

A single `setMovies({...})` call after `Promise.all` resolves triggers only **one re-render** instead of 8 sequential ones.

---

### Axios Instance Pattern

Rather than importing `axios` and hardcoding the base URL in every file, a reusable instance is created once:

```js
// utility/movieInstances.js
const movieInstances = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});
```

Every API call then only specifies the path. Changing the base URL in the future is a one-line fix.

---

### Environment Variables with Vite

API keys never go in source code. Vite exposes `.env` variables to the browser only when prefixed with `VITE_`:

```js
// utility/requestUrl.js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
```

The `.env` file is listed in `.gitignore` so the key is never committed.

---

### Component Architecture & Props Drilling

Data is fetched once at the top (`App.jsx`) and passed down as props. No component below `App` fetches its own data — except `Banner.jsx`, which manages its own independent data need:

```
App.jsx  →  movies state (8 arrays)
              └── SlideShow (title + movies[category])
                    └── Card (single movie object)

Banner.jsx  →  fetches independently (its own useEffect)
```

This separation keeps components focused: `App` owns data, `SlideShow` owns layout, `Card` owns presentation.

---

### Conditional Rendering

Header uses `&&` short-circuit rendering to show/hide elements based on state:

```jsx
{isSearchOpen && <input type="text" placeholder="movie title..." />}
{isProfile && <div className="...dropdown..."> ... </div>}
{isMobileMenu && <nav className="lg:hidden ..."> ... </nav>}
```

The scroll-aware background switches via a ternary in the `className`:
```jsx
className={`fixed top-0 ... ${isScrolled ? "bg-black/95 backdrop-blur-md" : "bg-transparent"}`}
```

---

### Tailwind CSS v4 Patterns

**Responsive prefixes** — layout shifts across breakpoints inline:
```jsx
className="w-24 sm:w-32 md:w-40"  // logo sizing
className="px-4 sm:px-6 lg:px-10" // padding
```

**Group hover** — parent registers the group, children react to it without any JS:
```jsx
// Card.jsx
<div className="relative group ...">
  <img ... />
  <div className="hidden group-hover:block ..."> {/* expands on parent hover */}
```

**Gradient overlay** — `bg-linear-to-t` fades the banner into the black section below:
```jsx
<div className="absolute bottom-0 ... bg-linear-to-t from-black via-black/30 to-transparent pointer-events-none" />
```
`pointer-events-none` ensures the overlay doesn't block clicks on content behind it.

**`line-clamp-3`** — truncates the banner description to 3 lines with CSS only, no JS.

---

### CSS Modules + `:global()` for Third-Party Overrides

`SlideShow.module.css` is used alongside Tailwind specifically to override Swiper's internal class names. You can't target `.swiper-button-prev` with a Tailwind class, but you can from a CSS Module using `:global()`:

```css
/* show nav arrows only on row hover */
.row :global(.swiper-button-prev),
.row :global(.swiper-button-next) {
  opacity: 0;
  pointer-events: none;
}
.row:hover :global(.swiper-button-prev),
.row:hover :global(.swiper-button-next) {
  opacity: 1;
  pointer-events: auto;
}
```

On mobile (touch, no hover), the arrows are always visible at `opacity: 0.7`.

---

### Swiper Responsive Carousel

`SlideShow.jsx` uses `breakpoints` to progressively show more cards as screen width increases:

```js
breakpoints: {
  0:    { slidesPerView: 1.8, spaceBetween: 8  },
  480:  { slidesPerView: 2.3, spaceBetween: 10 },
  640:  { slidesPerView: 3.2, spaceBetween: 16 },
  768:  { slidesPerView: 3.8, spaceBetween: 20 },
  1024: { slidesPerView: 5.2, spaceBetween: 30 },
  1280: { slidesPerView: 5.8, spaceBetween: 40 },
}
```

Fractional `slidesPerView` (e.g. `5.8`) intentionally peeks the next card to hint that the row is scrollable.

---

### Dynamic Inline Styles

When a value is computed at runtime (like a URL from the API), it can't be a Tailwind class. `Banner.jsx` uses an inline `style` prop:

```jsx
style={{ backgroundImage: `url("${BANNER_BASE}${bannerImage.backdrop_path}")` }}
```

This is the correct pattern — Tailwind for static design tokens, inline styles for dynamic values.

---

### Optional Chaining (`?.`)

Used throughout to guard against rendering before API data arrives:

```js
movies?.map(...)           // SlideShow — safe before data loads
movies?.title || movies?.name  // Card — handles both movies and TV shows
str?.length > n            // Banner truncate helper
```

---

## Concepts Practiced at a Glance

| Concept | Where |
|---------|-------|
| `useState` | App, Header (×4), Banner |
| `useEffect` + cleanup | Header (scroll listener) |
| `useEffect` on mount | App, Banner (data fetch) |
| `Promise.all` parallel requests | App.jsx |
| Axios instance (`axios.create`) | movieInstances.js |
| Vite env vars (`import.meta.env`) | requestUrl.js |
| Conditional rendering (`&&`, ternary) | Header |
| Props drilling | App → SlideShow → Card |
| Optional chaining (`?.`) | SlideShow, Card, Banner |
| Array `.map()` with `key` | SlideShow |
| CSS Modules + `:global()` | SlideShow.module.css |
| Tailwind responsive prefixes | All components |
| Tailwind `group` / `group-hover:` | Card |
| Tailwind `pointer-events-none` | Banner overlay |
| Dynamic inline styles | Banner |
| Swiper with responsive `breakpoints` | SlideShow |
| React 19 `createRoot` | main.jsx |
| `BrowserRouter` + `<Link>` | App, Header |
| Random item from API array | Banner |
| String truncation helper | Banner |
| Named vs default ES module exports | movieInstances (named), requests (default) |
