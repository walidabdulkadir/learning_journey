# Netflix Clone

A frontend Netflix clone built with React and Vite, consuming the TMDB API. This project was the hands-on introduction to the modern React ecosystem before diving into AI topics.

---

## What I Built

A responsive, multi-section Netflix-style UI that includes:

- A fixed **Header** with scroll-aware background, expandable search, profile dropdown, notification badge, and a responsive mobile hamburger menu
- A dynamic **Banner** that picks a random Netflix Original on each load and displays its backdrop image, title, and truncated description
- Multiple **SlideShow rows** (Trending, Action, Top Rated, Comedy) each powered by Swiper with responsive breakpoints
- A **Card** component with a hover expand effect that reveals action icons, rating, quality badge, and genre tags
- A **Footer**
- All movie data fetched in parallel from the TMDB API on app mount

---

## What I Learned

### React Fundamentals
- `useState` for managing local UI state (scroll position, search open/closed, dropdown open/closed, mobile menu, fetched data)
- `useEffect` for side effects — fetching data on mount and attaching/cleaning up scroll event listeners
- Props for passing data down from `App` → `SlideShow` → `Card`
- Conditional rendering for toggling the search input, profile dropdown, and mobile nav
- Event listeners with proper cleanup (`return () => window.removeEventListener(...)`) to avoid memory leaks

### API Integration with Axios
- Creating a reusable **Axios instance** with a shared `baseURL` to avoid repeating the TMDB base URL in every call
- Organizing all API endpoint paths in a single `requestUrl.js` utility object
- Using `Promise.all` to fire multiple API requests **in parallel** instead of one after another, loading all movie categories at once
- Storing API keys securely in `.env` and accessing them via `import.meta.env.VITE_*` (Vite's environment variable convention)

### Component Architecture
- Breaking the UI into focused, single-responsibility components: `Header`, `Banner`, `SlideShow`, `Card`, `Footer`
- Keeping data fetching at the top level (`App.jsx`) and passing results down as props — a clean separation between data and presentation

### Responsive Design with Tailwind CSS
- Utility-first styling with Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`) to handle layout across screen sizes
- Fixed positioning and `z-index` management for the sticky header
- CSS `group` and `group-hover:` utilities to trigger child element visibility on parent hover (the card hover expand effect)
- Gradient overlays using `bg-linear-to-t` for the banner fade-to-black effect
- CSS Modules (`SlideShow.module.css`) alongside Tailwind for scoped styles

### Swiper for Carousels
- Using `Swiper` with the `Navigation` module for arrow-controlled sliding rows
- `breakpoints` config to set different `slidesPerView` and `spaceBetween` values per screen width — proper responsive carousel behavior

### Scroll-Aware UI
- Listening to `window.scrollY` to switch the header background from transparent to a dark blurred background once the user scrolls past 50px — a common real-world UX pattern

### CSS & UX Patterns
- `scale` transform on hover with `z-index` management so expanded cards sit on top of siblings
- `line-clamp` utility to truncate long text to a set number of lines
- `pointer-events-none` on overlay elements so they don't block clicks on content behind them

---

## Tech Stack

| Tool | Role |
|------|------|
| React 19 | UI library |
| Vite | Build tool & dev server |
| Tailwind CSS v4 | Styling |
| React Router DOM v7 | Client-side routing setup |
| Axios | HTTP client / API calls |
| Swiper | Carousel rows |
| Lucide React | Header icons |
| React Icons | Card action icons |
| TMDB API | Movie & TV show data |

---

## Project Structure

```
src/
├── components/
│   ├── Header.jsx       # Fixed nav with scroll effect, search, profile dropdown, mobile menu
│   ├── Banner.jsx       # Random hero image from Netflix Originals
│   ├── SlideShow.jsx    # Swiper-powered movie row
│   ├── Card.jsx         # Movie card with hover expand
│   └── Footer.jsx
├── utility/
│   ├── movieInstances.js  # Axios instance with TMDB base URL
│   └── requestUrl.js      # All API endpoint paths
├── Data/
│   └── Data.js            # Static mock data
├── App.jsx                # Root — fetches all categories with Promise.all
└── main.jsx
```

---

## Key Takeaways

- `Promise.all` is the right pattern when you need multiple independent API calls — don't await them one by one.
- Keep API keys out of source code — use `.env` files and never commit them.
- Axios instances prevent repetition and make base URL changes a one-line fix.
- Tailwind's `group-hover:` is a clean solution for parent-triggered child animations without any JavaScript.
- Always clean up event listeners in `useEffect` return functions to prevent memory leaks.
