<div align="center">
  <img src="./public/logo.png" width="100" height="100" alt="Rankify Logo">
  <h1>Rankify 🎵</h1>
  <p>A music ranking platform that lets users search for albums on Spotify and rank them from best to worst.</p>
  <p>Play now 👉 <a href="https://albumranker.netlify.app/" target="_blank" rel="noreferrer">Rankify</a></p>
</div>

## About
Rankify is a platform that allows users to rank their favorite songs from any album using a drag-and-drop interface. Whether you're debating the best song on a new release or ranking classic albums, Rankify helps you create and share personalized rankings. Built with React, TypeScript, Tailwind CSS, and DnD Kit.

## Features
🎵 Search for albums using the Spotify API  
🔀 Drag and drop tracks to create custom rankings  
📱 Responsive design  

## Limitations
- Rankify does not store user rankings permanently (considering future improvements for persistent rankings).  
- Spotify API limitations may impact the availability of some albums or track previews.  

## Development
### Getting Started

**Note:**
- Requires Node.js 20 or later.
- Install pnpm version 9 or later.

Clone this repository:
sh
git clone https://github.com/yourusername/rankify.git
cd rankify


Install dependencies:
sh
pnpm install


Start the development server:
sh
pnpm dev  # Runs on http://localhost:5173/
