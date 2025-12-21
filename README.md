<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# The International Coalition for Human Rights (ICHR)

The official website of The International Coalition for Human Rights (ICHR), featuring news, reports, and humanitarian missions worldwide.

## Tech Stack

- **Frontend:** React 19 with TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS
- **UI Icons:** Lucide React
- **Maps:** Leaflet
- **Server:** Node.js with Express, Prisma ORM

## Run Locally

**Prerequisites:** Node.js (v18 or higher recommended)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
├── components/        # React components (pages, UI elements)
├── context/          # React Context providers
├── server/           # Backend server (Express, Prisma)
├── App.tsx           # Main application component
├── index.tsx         # Application entry point
└── vite.config.ts    # Vite configuration
```

## Features

- **Home Page:** Latest news and mission updates
- **Locations:** Interactive world map showing ICHR presence
- **Donate:** Support humanitarian efforts
- **Volunteer:** Get involved with ICHR missions
- **About:** Learn about ICHR's mission and impact
- **Contact:** Reach out to the organization
- **Admin Dashboard:** Content management (authentication required)

## Development Notes

This is a fully standalone, local-first project with no external API dependencies. All features work offline except for map tiles and Google Fonts.

## License

© The International Coalition for Human Rights (ICHR). All rights reserved.
