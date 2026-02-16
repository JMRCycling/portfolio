# Mason Tuft - Developer Portfolio

A modern, interactive portfolio website showcasing my software development projects.

## Features

- **Modern Dark Theme** - Clean, professional design with purple/indigo accent colors
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Elements**:
  - Custom cursor follower effect
  - Smooth scroll animations
  - Project filter system (All, Mobile, Web, Tools)
  - Animated statistics counter
  - Parallax hero section
- **Performance Optimized** - Vanilla HTML/CSS/JS with no dependencies

## Projects Showcased

### Mobile Apps
- **KOR Mobile App** - Bike maintenance tracking with Strava integration (iOS & Android)
- **KOR Admin Dashboard** - React Native admin interface for KOR ecosystem

### Web Applications
- **KOR Website** - Production marketing site with React, CI/CD, and comprehensive testing
- **Stauffer Landscaping** - Responsive business website
- **Web Development Projects** - Course projects demonstrating front-end fundamentals

### Developer Tools
- **Route Optimizer** - Python-based service route optimization with Google Maps API
- **Grading Automation Suite** - Shell scripting for .NET assignment grading

## Tech Stack

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter, Fira Code)

## Quick Start

1. Open `index.html` in your browser, or

2. Use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   ```

3. Navigate to `http://localhost:8000`

## Customization

### Colors
Edit CSS variables in `css/styles.css`:

```css
:root {
    --bg-primary: #0a0a0f;
    --accent-primary: #6366f1;
    --accent-secondary: #8b5cf6;
}
```

### Content
- Update project information in `index.html`
- Replace placeholder links with actual GitHub/deployment URLs
- Add a profile photo by replacing the placeholder in the About section

## Deployment

This portfolio can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service
- Your own server (e.g., jmrcycling.com)

### Deploy to your server:
```bash
rsync -avz --delete portfolio/ user@yourserver.com:/var/www/portfolio/
```

## Contact

- **Email**: mason@jmrcycling.com
- **Website**: [jmrcycling.com](https://jmrcycling.com)
- **Location**: Idaho, USA

---

Built with ❤️ by Mason Tuft
