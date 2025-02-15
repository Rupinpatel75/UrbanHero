# SmartCity Platform

A modern web application enabling citizen engagement through interactive reporting and location-based services, designed to streamline community feedback and urban issue tracking.

## Features

- 🗺️ Interactive Map Integration
- 📱 Responsive Design
- 📝 Issue Reporting System
- 👥 User Management
- 📊 Case Management Dashboard
- 🎁 Rewards System

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm (comes with Node.js)

## Installation

1. Download or clone the project to your local machine
2. Navigate to the project directory
```bash
cd smartcity-platform
```
3. Install dependencies
```bash
npm install
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```
2. Open your browser and navigate to `http://localhost:5000`

The application will start in development mode with hot-reload enabled.

## Project Structure

```
smartcity-platform/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── lib/         # Utilities and helpers
│   │   └── hooks/       # Custom React hooks
├── server/              # Backend Express server
│   ├── routes.ts        # API routes
│   └── storage.ts       # Data storage interface
├── shared/              # Shared types and utilities
└── public/             # Static assets
```

## Features Guide

### 1. Issue Reporting
- Upload images of infrastructure issues
- Add location data using interactive map
- Provide detailed descriptions
- Set priority levels

### 2. Case Management
- Track reported issues
- Filter and search capabilities
- Status updates
- Export functionality

### 3. User Dashboard
- Overview of reported issues
- Personal activity tracking
- Rewards system integration

### 4. Interactive Map
- View reported issues by location
- Select locations for new reports
- Filter issues by type and status

## Development Notes

- The frontend is built with React and TypeScript
- Uses shadcn UI components for consistent styling
- Leaflet for map integration
- Form validation using react-hook-form and zod
- State management with TanStack Query

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
