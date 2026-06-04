# VOID Studio - Portfolio Website

Premium portfolio website for VOID, a web development studio based in Porto, Portugal.

## Stack

- **React 19 + Vite 8 + TypeScript**
- **Tailwind CSS v4** - utility-first styling via CSS `@theme` config
- **GSAP 3 + ScrollTrigger** - all scroll and entrance animations
- **Google Fonts** - Syne (display) + Inter (body)

## Getting Started

```bash
npm install
npm run dev       # development server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Updating Content

All copy, project data, and links live in **one file**:

```
src/content.ts
```

### Studio info

Edit the `studio` object - name, tagline, email, phone, social URLs, and location.

### Hero headline

Edit `hero.lines` - an array of strings, one per line. Adjust `accentLineIndex` to control which line renders in amber.

### Projects

Edit the `projects` array. Each entry:

| Field         | Description                                    |
| ------------- | ---------------------------------------------- |
| `id`          | Display number (e.g. `"01"`)                   |
| `name`        | Project name - shown in large type             |
| `category`    | Label (e.g. `"Institucional"`, `"E-commerce"`) |
| `description` | Short descriptor shown on hover                |
| `year`        | Year string                                    |
| `accentColor` | Base color for the placeholder block           |

To use a real image, import it at the top of `Projects.tsx` and set `image: yourImport` in the project object. The component renders a gradient block when `image` is `null`.

### Services

Edit the `services` array - `number`, `title`, `description`.

### About

Edit `about.text` and `about.subtext`.

### Navigation

Edit `nav` - an array of `{ label, href }` objects.

## Customising Design Tokens

Tokens are defined in two places:

1. **`src/index.css`** - `@theme {}` block for Tailwind utilities (`bg-void-amber`, `text-void-white`, etc.)
2. **`src/design-tokens.ts`** - TypeScript constants for GSAP/JS usage

The accent color is `#c9a96e` (warm amber). To change it, replace `--color-void-amber` in CSS and `amber` in `design-tokens.ts`.

Fonts are loaded in `index.html`. Swap the Google Fonts `href` and the `@theme` font-family values.

## Animation Notes

- All GSAP animations check `prefers-reduced-motion` and skip to the final state if set.
- Intro duration is ~3.1s. Adjust timing in `IntroAnimation.tsx` → the GSAP timeline.
- ScrollTrigger `start` values are `"top 75-82%"` - adjust per section for earlier/later triggers.
- Eases: `power3.out` (entrances), `power3.inOut` (panel wipes), `power2.out` (fades). No bounce.

## Contact Form

The form in `Footer.tsx` currently simulates submission. Replace the `handleSubmit` body:

- **Formspree**: `fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: formData })`
- **EmailJS**: use their SDK
- **Custom API**: replace with your endpoint
