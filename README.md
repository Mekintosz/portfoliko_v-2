# Portfolio v2 - Front-End Developer Portfolio

A modern, responsive portfolio website vanila HTML, JavaScript and CSS using BEM (Block Element Modifier) naming convention.

## Features

- **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
- **Interactive Navigation**: Smooth scrolling with active section indicators
- **Generative Art Background**: Interactive particle animation that responds to mouse movement
- **Modern UI**: Clean, professional design with smooth animations and transitions
- **BEM CSS Architecture**: Well-organized, maintainable CSS using BEM methodology
- **Vanilla JavaScript**: No framework dependencies, pure JavaScript for interactivity

## Sections

1. **Hero**: Introduction with call-to-action
2. **About**: Personal information and resume/CV links
3. **Projects**: Portfolio showcase with project details
4. **Skills**: Technical skills organized by category
5. **Contact**: Contact form and information
6. **Footer**: Social links and copyright

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript**: ES6+ features, Intersection Observer API
- **Vite**: Build tool and development server
- **Urbanist Font**: Modern Google Font with multiple weights (Light, Regular, Medium, Semibold, Bold, Extrabold, Black)
- **Material Symbols**: Icon library

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd portfolio_v2
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
portfolio_v2/
├── index.html              # Main HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── .gitignore             # Git ignore rules
├── README.md              # Project documentation
└── src/
    ├── styles/
    │   ├── variables.css  # CSS variables and design tokens
    │   └── main.css       # Main stylesheet with BEM classes
    └── js/
        └── main.js        # JavaScript functionality
```

## CSS Architecture

The project uses BEM (Block Element Modifier) naming convention combined with a comprehensive CSS variables system:

- **Block**: `.hero`, `.about`, `.projects`
- **Element**: `.hero__title`, `.about__content`, `.project__image`
- **Modifier**: `.hero__cta--primary`, `.about__content--left`, `.navigation__dot--active`

### Design System

All colors, fonts, spacing, and design tokens are centralized in CSS variables:

- **Colors**: Primary, background, text, and particle colors
- **Typography**: Urbanist font family with multiple weights (300-900)
- **Spacing**: Consistent spacing scale from 4px to 80px
- **Shadows & Borders**: Consistent shadow and border radius system
- **Transitions**: Standardized animation timing

#### Font System

The project uses the **Urbanist** font family, a modern geometric sans-serif typeface from Google Fonts with the following weights:

- **Light (300)**: For subtle text and captions
- **Regular (400)**: For body text and standard content
- **Medium (500)**: For emphasized text and navigation
- **Semibold (600)**: For subheadings and important labels
- **Bold (700)**: For headings and important elements
- **Extrabold (800)**: For major headings
- **Black (900)**: For hero text and major headings

Font is loaded from Google Fonts with `display=swap` for better loading performance.

See `DESIGN_SYSTEM.md` for complete documentation.

## Customization

### Colors

The color scheme is defined using CSS custom properties in the main CSS file:

- Primary: `rgb(255, 164, 0)` (Orange)
- Background Light: `#f6f7f8`
- Background Dark: `rgb(36, 41, 47)`
- Text Light: `rgb(206, 215, 227)`

### Content

Update the content in `index.html` to reflect your personal information, projects, and skills.

### Images

Replace the placeholder images with your actual project screenshots and profile picture.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this portfolio template for your own projects.

## Author

John Doe - Front-End Developer

---

**Note**: This project was converted from a Tailwind CSS implementation to vanilla CSS with BEM naming convention for better maintainability and performance.
