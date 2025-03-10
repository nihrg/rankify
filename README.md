<div align="center">
 <img src="./public/logo.png" width="100" height="100" alt="Rankify Logo">
 <h1>🎵 Rankify</h1>
 <p>Create, customize, and share your ultimate music rankings</p>


 <p>
   <a href="https://albumranker.netlify.app/">View Demo</a>
   ·
   <a href="https://github.com/nihrg/rankify/issues">Report Bug</a>
   ·
   <a href="https://github.com/nihrg/rankify/issues">Request Feature</a>
 </p>
</div>

## ✨ Features

- **🔍 Powerful Search**: Search through Spotify's vast library of albums and artists
- **📱 Responsive Design**: Seamless experience across all devices
- **🎨 Beautiful UI**: Modern, intuitive interface with smooth animations
- **🔄 Drag & Drop**: Intuitive drag-and-drop interface for ranking tracks
- **📸 Export Rankings**: Export your rankings as beautiful images to share
- **🎯 Real-time Updates**: Instant updates as you modify your rankings
- **🌈 Custom Styling**: Beautiful gradients and visual design for each ranking

## 🚀 Quick Start

### Prerequisites

- Node.js 20.0.0 or later
- npm 10.0.0 or later

### Installation

1. Clone the repository
  ```sh
  git clone https://github.com/nihrg/rankify.git
  cd rankify
  ```

2. Install dependencies
  ```sh
  npm install
  ```

3. Create a `.env` file in the root directory with your Spotify API credentials:
  ```env
  VITE_SPOTIFY_CLIENT_ID=your_client_id
  VITE_SPOTIFY_CLIENT_SECRET=your_client_secret
  VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/callback
  ```

4. Start the development server
  ```sh
  npm run dev
  ```

## 🛠️ Built With

- [React](https://reactjs.org/) - UI Framework
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vite](https://vitejs.dev/) - Build Tool
- [React DnD](https://react-dnd.github.io/react-dnd/) - Drag and Drop
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) - Music Data
- [html-to-image](https://github.com/bubkoo/html-to-image) - Image Export
- [Lucide React](https://lucide.dev/) - Icons

## 📖 Usage

1. **Search**: Enter an album or artist name in the search bar
2. **Select**: Click on an album or artist to view their tracks
3. **Rank**: Drag tracks to your ranking list in your preferred order
4. **Customize**: Edit the title of your ranking
5. **Export**: Download your ranking as an image to share

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the Apache-2.0 license License. See `LICENSE` for more information.

## 📫 Contact

Project Link: [https://github.com/nihrg/rankify](https://github.com/nihrg/rankify)

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Unsplash](https://unsplash.com/) for background images
- [Lucide](https://lucide.dev/) for beautiful icons