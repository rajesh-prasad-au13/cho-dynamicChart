# Dynamic Chart - React Version

This is a React TypeScript port of the Vue.js dynamic chart project. It creates animated racing bar charts with smooth transitions and country/team flag images.

## Features

- **Dynamic Racing Bar Charts**: Animated bar charts that race over time
- **Smooth Transitions**: Uses Tween.js for smooth value interpolations
- **Modern React**: Built with React 18, TypeScript, and Vite
- **Responsive Design**: Uses viewport-based units for responsiveness
- **Team/Country Flags**: Displays images alongside bars
- **Customizable**: Multiple configuration options for animation timing, limits, etc.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tween.js** for smooth animations
- **Shuffle.js** for DOM element reordering
- **React Router** for navigation
- **CSS3** with viewport units for responsive design

## Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Build for Production**

   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Migration from Vue.js

This project has been migrated from Vue.js to React while maintaining the same functionality:

- **Vue Composition API** → **React Hooks** (useState, useEffect, useRef, etc.)
- **Vue Templates** → **JSX**
- **Vue Props** → **React Props with TypeScript interfaces**
- **Vue Reactivity** → **React State Management**
- **Vue Lifecycle Hooks** → **React useEffect**

## Development Guidelines

- Use **React Functional Components** with hooks
- Follow **TypeScript** best practices with proper interfaces
- Use **ESLint** and **Prettier** for code consistency
- Write clean, readable code with descriptive variable names
- Keep components focused and reusable
