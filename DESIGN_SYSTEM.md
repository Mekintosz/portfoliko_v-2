# Portfolio Design System

This document outlines the design system used in the Portfolio v2 project, including all CSS variables, color palettes, typography, spacing, and other design tokens.

## 🎨 Color Palette

### Primary Colors

- **Primary**: `rgb(255, 164, 0)` - Orange accent color
- **Primary Hover**: `rgba(255, 164, 0, 0.9)` - Darker orange for hover states
- **Primary Dark**: `rgb(30, 41, 59)` - Dark blue for text on primary background

### Background Colors

- **Light Background**: `#f6f7f8` - Light gray for light theme
- **Dark Background**: `rgb(36, 41, 47)` - Dark gray for dark theme
- **Canvas Background**: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)` - Gradient for generative background
- **Section Background**: `rgba(36, 41, 47, 0.5)` - Semi-transparent dark for sections
- **Input Background**: `rgb(30, 41, 59)` - Dark background for form inputs

### Text Colors

- **Primary Text**: `rgb(206, 215, 227)` - Light gray for main text
- **Secondary Text**: `rgb(148, 163, 184)` - Medium gray for secondary text
- **Tertiary Text**: `rgb(203, 213, 225)` - Light gray for labels
- **White Text**: `white` - Pure white for headings

### Particle Colors (Generative Background)

- **Particle 1**: `#FFC107` - Yellow
- **Particle 2**: `#E91E63` - Pink
- **Particle 3**: `#9C27B0` - Purple
- **Particle 4**: `#03A9F4` - Blue
- **Particle 5**: `#4CAF50` - Green

### Hero Background

- **Hero Image**: High-quality Unsplash image with parallax scrolling effect
- **Parallax Speed**: `0.5` - Controls the scrolling speed of the background
- **Parallax Offset**: `-20%` top/bottom for smooth edge transitions

## 📝 Typography

### Font Family

- **Primary**: `"Urbanist", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` - Main font family
- **Fallback**: System fonts for better performance and cross-platform compatibility

### Font Weights

- **Light**: `300` - Subtle text and captions
- **Normal**: `400` - Regular text and body content
- **Medium**: `500` - Emphasized text and navigation
- **Semibold**: `600` - Subheadings and important labels
- **Bold**: `700` - Bold text and headings
- **Extrabold**: `800` - Major headings
- **Black**: `900` - Extra bold for hero text and major headings

### Font Implementation

The Urbanist font family is loaded from Google Fonts for optimal performance and reliability:

- **Google Fonts**: Hosted on Google's CDN for fast loading
- **Display Swap**: Font loads with `display=swap` for better user experience
- **Multiple Weights**: All weights (300-900) loaded efficiently
- **Fallback Fonts**: System fonts provide immediate text rendering

Font is loaded via HTML link tag with optimized loading strategy.

### Font Sizes

- **XS**: `0.75rem` (12px) - Small labels
- **SM**: `0.875rem` (14px) - Small text
- **Base**: `1rem` (16px) - Body text
- **LG**: `1.125rem` (18px) - Large body text
- **XL**: `1.25rem` (20px) - Small headings
- **2XL**: `1.5rem` (24px) - Medium headings
- **3XL**: `1.875rem` (30px) - Large headings
- **4XL**: `2.25rem` (36px) - Extra large headings
- **5XL**: `3rem` (48px) - Hero headings
- **6XL**: `3.75rem` (60px) - Display headings

### Line Heights

- **Tight**: `1.2` - For headings
- **Normal**: `1.5` - For body text
- **Relaxed**: `1.625` - For large text blocks
- **Base**: `1.6` - Default line height

### Letter Spacing

- **Tight**: `-0.033em` - For large headings
- **Normal**: `0.015em` - For buttons and UI elements

## 📏 Spacing System

The spacing system uses a consistent scale based on rem units:

- **XS**: `0.25rem` (4px) - Tiny spacing
- **SM**: `0.5rem` (8px) - Small spacing
- **MD**: `1rem` (16px) - Medium spacing
- **LG**: `1.5rem` (24px) - Large spacing
- **XL**: `2rem` (32px) - Extra large spacing
- **2XL**: `2.5rem` (40px) - Section spacing
- **3XL**: `3rem` (48px) - Large section spacing
- **4XL**: `4rem` (64px) - Page padding
- **5XL**: `5rem` (80px) - Section padding

## 🔲 Border Radius

- **SM**: `0.25rem` (4px) - Small rounded corners
- **MD**: `0.375rem` (6px) - Medium rounded corners
- **LG**: `0.5rem` (8px) - Large rounded corners
- **XL**: `0.75rem` (12px) - Extra large rounded corners
- **Full**: `9999px` - Fully rounded (pills, circles)

## 🌟 Shadows

- **SM**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)` - Subtle shadow
- **MD**: `0 25px 50px -12px rgba(0, 0, 0, 0.25)` - Medium shadow
- **Focus**: `0 0 0 3px rgba(255, 164, 0, 0.1)` - Focus ring

## 🎭 Z-Index Layers

- **Canvas**: `-1` - Background canvas
- **Content**: `1` - Main content
- **Overlay**: `0` - Hero overlay
- **Hero Content**: `10` - Hero text content
- **Navigation**: `50` - Navigation dots

## ⚡ Transitions

- **Fast**: `0.15s ease` - Quick transitions
- **Normal**: `0.3s ease` - Standard transitions
- **Slow**: `0.5s ease` - Slow transitions
- **Bounce**: `0.3s ease-in-out` - Bouncy animations

## 🌊 Parallax Effects

- **Speed**: `0.5` - Parallax scrolling speed (0.1 = slow, 0.8 = fast)
- **Offset Top**: `-20%` - Top margin for smooth edge transitions
- **Offset Bottom**: `-20%` - Bottom margin for smooth edge transitions

## 📱 Responsive Breakpoints

- **SM**: `480px` - Small screens
- **MD**: `768px` - Medium screens
- **LG**: `1024px` - Large screens
- **XL**: `1280px` - Extra large screens

## 🎯 Usage Examples

### Using Colors

```css
.button {
  background-color: var(--color-primary);
  color: var(--color-primary-dark);
}

.button:hover {
  background-color: var(--color-primary-hover);
}
```

### Using Typography

```css
.heading {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}
```

### Using Spacing

```css
.section {
  padding: var(--spacing-5xl) var(--spacing-4xl);
  margin-bottom: var(--spacing-3xl);
}
```

### Using Shadows and Borders

```css
.card {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
}
```

## 🔧 Customization

To customize the design system:

1. **Colors**: Modify the color variables in `src/styles/variables.css`
2. **Typography**: Adjust font sizes, weights, and line heights
3. **Spacing**: Modify the spacing scale to match your needs
4. **Components**: Update component styles to use the variables

## 🌙 Theme Support

The design system supports theme variations through data attributes:

```css
[data-theme="light"] {
  --color-background-light: #ffffff;
  --color-text-primary: #1a1a1a;
}

[data-theme="dark"] {
  --color-background-dark: rgb(36, 41, 47);
  --color-text-primary: rgb(206, 215, 227);
}
```

## 📁 File Structure

```
src/styles/
├── variables.css    # All CSS variables and design tokens
├── main.css        # Main stylesheet using the variables
└── components/     # Component-specific styles (future)
```

This design system ensures consistency across the entire portfolio and makes it easy to maintain and customize the visual design.
