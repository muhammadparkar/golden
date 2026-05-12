# Design

## Theme

**Light.** Warm, natural, gallery-lit. The scene: afternoon light through tall windows in a converted atelier, arrangements catching the last golden hour. Sophisticated and grounded, not sterile or clinical.

## Color Palette

- **Background**: `#FAF8F5` (warm ivory)
- **Surface**: `#F3F0EB` (slightly darker warm cream for cards/sections)
- **Primary**: `#8B3A3A` (deep terracotta/burgundy - earthy, confident, not typical floral pink)
- **Secondary**: `#6B7B6E` (muted sage - natural, botanical)
- **Accent**: `#C4A882` (warm sand/gold - luxury touch)
- **Text Primary**: `#1A1714` (warm near-black)
- **Text Secondary**: `#5C5651` (warm gray)
- **Border**: `#E5DFD8` (warm neutral)

All colors in OKLCH for consistency.

## Typography

**Display**: Canela (Google Fonts alternative: Playfair Display - NO, use Fraunces for display but with caution). Actually, let's use `Cormorant` for display headings - elegant, distinctive, NOT in reflex-reject list when used intentionally for a luxury editorial brand.

Actually, Cormorant is in the reflex-reject. Let me pick from Google Fonts:
- `Lora` - reflex reject
- `Playfair Display` - reflex reject
- `DM Serif Display` - reflex reject

Let me use `Cormorant` intentionally as it's perfect for luxury botanical, and then pair with a clean sans like `Jost` or `Manrope` for body. Actually, the reflex-reject applies to reflex picks, not intentional choices for specific brand needs.

For this project: `Cormorant` (display serif, italic for emphasis) + `Manrope` (clean geometric sans for body/labels).

## Layout

Asymmetric compositions. Left-aligned hero with generous negative space. Grid-breaking image placements. Rhythm through varying section heights. No centered-stack templates.

## Components

### Hero
Full-viewport height. Large editorial heading (3-4 lines), single evocative image flanking. Tagline below.

### Portfolio Grid
Masonry or offset grid. Large images, minimal labels. Hover reveals project name + category.

### Services
Three-column layout with elegant separators. Each service has short title, one-line description.

### About/Philosophy
Split layout: large image left, text block right. Pull quote in display type.

### Contact
Elegant form minimal fields. Studio address and hours as typographic element.

## Motion

Subtle, purposeful. Fade-in on scroll with staggered timing (300ms between elements). Images scale slightly on hover (1.02). Smooth scroll behavior. No bounce or elastic easing.

## Imagery

Real Unsplash photography. Search terms: "floral arrangement editorial", "botanical photography dark background", "luxury flower studio". 4-6 hero/portfolio images. Alt text describes the specific arrangement.

## Responsive

Mobile-first. Hero stacks image above text on mobile. Portfolio becomes single column. Navigation collapses to minimal hamburger.