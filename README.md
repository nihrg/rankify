<div align="center">
  <img src="public/logo.svg" alt="Rankify Logo" width="128" height="128" />
  <h1>Rankify</h1>
  <p>Create, Customize, and Share Your Ultimate Music Rankings</p>

  <p>
    <a href="https://albumranker.netlify.app/"><strong>View Demo</strong></a>
    ·
    <a href="https://github.com/nihrg/rankify/issues"><strong>Report Bug</strong></a>
    ·
    <a href="https://github.com/nihrg/rankify/issues"><strong>Request Feature</strong></a>
  </p>
</div>

## 📋 Overview

Rankify is a modern, user-friendly platform designed for music enthusiasts to create, customize, and share personalized music rankings. Powered by the Spotify Web API, Rankify allows users to search for their favorite albums, artists, and songs, rank tracks with an intuitive drag-and-drop interface, and export their rankings as visually stunning images optimized for sharing. Whether you're a casual listener or a dedicated music curator, Rankify offers a seamless and engaging experience across all devices.

---

## ✨ Key Features

- **🎵 Advanced Music Search**  
  - Access Spotify's extensive library to search for albums, artists, and songs.  
  - Explore detailed metadata, including album artwork, release dates, and artist information.  
  - View top tracks and full album listings with ease.

- **🎯 Intuitive Drag-and-Drop Ranking**  
  - Effortlessly rank tracks using a smooth drag-and-drop interface.  
  - Add or remove tracks with a single click, or use the "Select All" feature for batch selection.  
  - Enjoy real-time reordering with fluid animations for a polished experience.

- **🎨 Visually Stunning Design**  
  - Modern, responsive UI with a sleek dark theme and glass-morphism effects.  
  - Dynamic gradient backgrounds that respond to mouse movement.  
  - Custom-designed music note logo and vibrant track gradients for a professional look.  
  - Smooth transitions and animations throughout the application.

- **📱 Fully Responsive Experience**  
  - Optimized for desktop, tablet, and mobile devices.  
  - Adaptive layouts ensure a seamless experience across all screen sizes.  
  - Touch-friendly controls for an intuitive mobile experience.

- **🔒 Secure Authentication**  
  - Seamless Spotify integration for a personalized experience.  
  - Optional guest mode for quick access without signing in.  
  - Secure token-based authentication to protect user data.

- **🎨 Customization Options**  
  - Edit ranking titles to personalize your lists.  
  - Customize track order to reflect your preferences.  
  - Each track in the final ranking is styled with a unique gradient theme.  
  - Easily clear all tracks or remove individual entries as needed.

- **📸 Export and Share**  
  - Export your rankings as high-quality images with a professional design.  
  - Optimized for social media sharing, including ranking titles, tracks, and artist details.  
  - Beautiful gradient themes and typography for a shareable, eye-catching result.

- **⚡ High Performance**  
  - Fast and responsive interface with efficient data loading and caching.  
  - Optimized for both desktop and mobile performance.  
  - Smooth animations and transitions for a delightful user experience.

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:  
- **Node.js**: Version 20.0.0 or later  
- **npm**: Version 10.0.0 or later  

You’ll also need Spotify API credentials to enable Spotify integration. You can obtain these by creating an app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).

### Installation

Follow these steps to set up Rankify locally:

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/nihrg/rankify.git
   cd rankify
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory and add your Spotify API credentials:  
   ```env
   VITE_SPOTIFY_CLIENT_ID=your_client_id
   VITE_SPOTIFY_CLIENT_SECRET=your_client_secret
   VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/callback
   ```

4. **Start the Development Server**  
   ```bash
   npm run dev
   ```

5. **Access the Application**  
   Open your browser and navigate to `http://localhost:5173` to start using Rankify.

---

## 🛠️ Technology Stack

Rankify is built with a modern tech stack to ensure performance, scalability, and a great developer experience:

- **[React](https://reactjs.org/)**: A powerful JavaScript library for building user interfaces.  
- **[TypeScript](https://www.typescriptlang.org/)**: Adds static typing for improved code quality and maintainability.  
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid and responsive styling.  
- **[Vite](https://vitejs.dev/)**: A fast, modern build tool for an optimized development experience.  
- **[React DnD](https://react-dnd.github.io/react-dnd/)**: Enables smooth drag-and-drop functionality.  
- **[Framer Motion](https://www.framer.com/motion/)**: Powers fluid animations and transitions.  
- **[Spotify Web API](https://developer.spotify.com/documentation/web-api/)**: Provides access to Spotify’s music catalog.  
- **[html-to-image](https://github.com/bubkoo/html-to-image)**: Converts rankings to shareable images.  
- **[Lucide React](https://lucide.dev/)**: A collection of lightweight, customizable icons.

---

## 📖 How to Use Rankify

1. **Search for Music**  
   Enter the name of an album, artist, or song in the search bar to explore Spotify’s library.

2. **Browse Tracks**  
   Select an album or artist to view their tracks, complete with metadata like stream counts and durations.

3. **Create Your Ranking**  
   Add tracks to your ranking list and use the drag-and-drop interface to arrange them in your preferred order.

4. **Customize Your List**  
   Edit the ranking title and fine-tune the order of tracks to reflect your taste.

5. **Export and Share**  
   Once your ranking is complete, export it as a beautifully designed image to share on social media or with friends.

---

## 🤝 Contributing

We welcome contributions from the community to help make Rankify even better! Follow these steps to contribute:

1. **Fork the Repository**  
   Click the "Fork" button at the top of the GitHub page to create your own copy of the project.

2. **Create a Feature Branch**  
   ```bash
   git checkout -b feature/YourAmazingFeature
   ```

3. **Commit Your Changes**  
   ```bash
   git commit -m "Add YourAmazingFeature"
   ```

4. **Push to Your Branch**  
   ```bash
   git push origin feature/YourAmazingFeature
   ```

5. **Open a Pull Request**  
   Submit a pull request on GitHub, and we’ll review your contribution as soon as possible.

For more details, please refer to our [Contributing Guidelines](CONTRIBUTING.md) (you may need to create this file if it doesn’t exist).

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## 📫 Contact

For questions, feedback, or collaboration opportunities, feel free to reach out:  
- **Project Maintainer**: Nihar  
- **GitHub**: [https://github.com/nihrg/rankify](https://github.com/nihrg/rankify)  
- **Issues**: [Report a Bug or Request a Feature](https://github.com/nihrg/rankify/issues)

---

## 🙏 Acknowledgments

We’d like to thank the following resources and communities for their contributions to Rankify:  
- **[Spotify Web API](https://developer.spotify.com/documentation/web-api/)**: For providing access to Spotify’s music data.  
- **[Unsplash](https://unsplash.com/)**: For high-quality background images.  
- **[Lucide](https://lucide.dev/)**: For their beautiful and lightweight icon set.  
- The open-source community for their continuous inspiration and support.

---

### ⭐️ Show Your Support

If you find Rankify useful, please consider giving it a star on GitHub! Your support helps us grow and continue improving the project.

---

This updated README maintains the original structure but enhances professionalism through clearer section titles, more detailed descriptions, and a polished tone. It also adds a few new sections like "Overview" and "Show Your Support" to make the project more engaging and professional. Let me know if you'd like further adjustments!