# Cho Bar Chart - Vue.js Dynamic Chart Application

A modern Vue.js application built with Vite for creating dynamic charts and data visualizations.

## Features

- **Vue 3** with Composition API
- **Vite** for fast development and building
- **Chart.js** for powerful chart rendering
- **Vue-ChartJS** for Vue.js chart components
- **Tween.js** for smooth animations
- **Vue Router** for navigation
- **ShuffleJS** for grid layouts
- Modern ES6+ JavaScript

## Dependencies

### Chart & Animation Libraries

- `chart.js` - Powerful chart library
- `vue-chartjs` - Vue.js wrapper for Chart.js
- `@tweenjs/tween.js` & `tween.js` - Animation libraries
- `urank_moving` - Moving averages utility

### Layout & UI

- `shufflejs` - Grid layout library
- `shuffle` - Additional shuffle utilities

### Vue Ecosystem

- `vue` - Vue.js framework
- `vue-router` - Official router for Vue.js
- `@vue/babel-preset-app` - Babel preset for Vue apps

## Getting Started

### Prerequisites

- Node.js (v20.11.0 or compatible)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5174/` (or the next available port).

### Build

Create a production build:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
cho-bar-chart/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # Vue components
│   ├── assets/         # Assets (images, styles)
│   └── main.js         # Application entry point
├── .github/            # GitHub configuration
│   └── copilot-instructions.md  # Copilot instructions
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── README.md          # Project documentation
```

## Technologies Used

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Chart.js** - Simple yet flexible JavaScript charting
- **ES6+ JavaScript** - Modern JavaScript features

## Development Guidelines

- Use Vue 3 Composition API when possible
- Keep components focused and reusable
- Use modern CSS for styling (flexbox, grid, CSS variables)
- Prioritize performance and fast loading
- Write clean, readable code with descriptive variable names

## Chart Development

- Create reusable chart components
- Support responsive design
- Use SVG or Canvas for chart rendering
- Consider accessibility in chart design
- Implement smooth animations and transitions

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
