const projectsData = [
  {
    slug: 'collaborative-whiteboard',
    title: 'Collaborative Whiteboard',
    description: 'A modern, real-time collaborative whiteboard showcasing multiuser drawing with WebSockets and an interactive canvas. Embedded as a demo on this site.',
    longDescription: `This is a modern, real-time collaborative whiteboard built with React and Socket.IO. Users join rooms using time-limited codes and see each other's live cursors while drawing freehand strokes, shapes (rect/line/circle), and text. The app supports PNG export, protected board reset, and can be embedded via iframe with strict CSP (frame-ancestors) headers.

Under the hood, the frontend uses React + TypeScript with Vite, Tailwind CSS for styling, and React Konva for the canvas layer. The backend is Node.js/Express with Socket.io and Helmet, and optional MongoDB Atlas persistence for room state. Deployed with a Vercel frontend and a Render-hosted Socket.IO server.`,
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Konva', 'Socket.IO', 'Node.js', 'Express', 'Helmet', 'MongoDB Atlas', 'WebSockets', 'Real-time Systems'],
    githubLink: 'https://github.com/NishTheFish-dev/collaborativewhiteboard',
    demoLink: 'https://collaborativewhiteboard-bice.vercel.app/',
    images: [],
    features: [
      'Real-time multiuser drawing powered by Socket.IO',
      'Freehand strokes, shapes (rect/line/circle), and text elements',
      'Live cursors with user name and color',
      'Time-limited collaboration codes for secure room joining',
      'PNG export of the canvas',
      'Board reset (protected by token)',
      'Embeddable via iframe with CSP `frame-ancestors`',
      'MongoDB persistence for room state if needed',
      'Responsive UI (Tailwind CSS) and dark theme',
    ],
  },
  {
    slug: 'youtube-music-client',
    
    title: 'YouTube Music Client',
    description: 'A custom desktop client for YouTube Music with a focus on a clean listening experience. Built to provide seamless music playback with a native app feel using modern web technologies.',
    longDescription: `This cross-platform desktop application wraps YouTube Music inside an Electron shell and layers native-app functionality on top of the web player. I wanted the functionality of YouTube Music while having the feel and aesthetic of Spotify's desktop client, so I decided to create this project. This project taught me a lot about Electron and React, as well as the principles of Full-Stack development. Learning how to create a desktop application was a new experience for me, and I was able to create a smooth and responsive user interface that provided a native feel to the application.
    
    This project is under active development and new features are being added very frequently, so please check the GitHub page for the full version history.
`,
    technologies: ['Electron', 'React', 'TypeScript', 'YouTube Music API', 'Desktop App'],
    githubLink: 'https://github.com/NishTheFish-dev/custom-ytmusic-client',
    demoLink: '',
    images: [
      { src: '/assets/ytmusic1.png', alt: 'YouTube Music Client Screenshot 1' },
      { src: '/assets/ytmusic2.png', alt: 'YouTube Music Client Screenshot 2' }
    ],
    features: [
      'Electron main process which creates a frameless window, handles native menus, global shortcuts, and auto-updates via electron-updater.',
      'A React + TypeScript renderer injects custom CSS/JS into the YouTube Music DOM (through a preload script) to darken the theme and expose player state.',
      'Player controls (play/pause, next, previous) are bound to system media keys and the tray menu using the YouTube IFrame API.',
      'Song changes are detected with a MutationObserver; metadata (title, artist, artwork) is forwarded to the OS media service to show rich notifications and task-bar progress.',
      'Settings such as theme preference, window size, and cache location persist with electron-store; auto-launch and deep-link handling deliver a native feel.',
      'CI/CD pipeline (GitHub Actions) builds and signs installers for Windows, macOS, and Linux.'
    ],
  },
  {
    slug: 'custom-spotify-client',
    title: 'Custom Spotify Client',
    description: 'A responsive web application that interfaces with the Spotify Web API to provide a custom music streaming experience with a modern UI built using React and TypeScript.',
    longDescription: `A feature-rich Spotify client built with React and TypeScript that provides a seamless music streaming experience. This application leverages the Spotify Web API and Web Playback SDK to deliver a responsive and interactive interface for Spotify Premium users. The app follows modern web development practices with a clean, component-based architecture and responsive design that works across all device sizes.

Key aspects of this project include implementing secure OAuth 2.0 authentication with PKCE flow, managing application state with React hooks, and creating a responsive UI with Tailwind CSS. The application demonstrates proficiency in working with external APIs, handling user authentication, and creating dynamic, interactive web applications.`,
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Spotify API', 'OAuth 2.0', 'Spotify Web Playback SDK'],
    githubLink: 'https://github.com/NishTheFish-dev/custom-spotify-client',
    demoLink: '',
    images: [
      { src: '/assets/spotify1.png', alt: 'Spotify Client Dashboard' },
      { src: '/assets/spotify2.png', alt: 'Spotify Client Playlist View' }
    ],
    features: [
      'Secure authentication using Spotify OAuth 2.0 with PKCE (Proof Key for Code Exchange) flow',
      'Interactive dashboard to view and manage Spotify playlists',
      'Detailed playlist view with track listings and added date information',
      'Comprehensive search functionality to find tracks across Spotify\'s library',
      'Full playback controls including play, pause, and skip (requires Spotify Premium)',
      'Responsive design that works seamlessly on both desktop and mobile devices',
      'Modern UI built with Tailwind CSS for a clean and intuitive user experience',
      'Type-safe development with TypeScript for better code quality and maintainability'
    ],
  },
  {
    slug: 'python-bot-application',
    title: 'Discord Farming Bot',
    description: 'A feature-rich Discord bot that simulates a farming experience with an interactive economy, skill progression, and real-time crop management system. Uses asynchronous events to handle user requests efficiently.',
    longDescription: `The Farmer is a sophisticated Discord bot that brings a complete farming simulation experience to Discord servers. Built using Python and the Discord.py library, this bot features a comprehensive farming system with real-time crop growth, an in-game economy, and a skill progression system. The bot was designed with scalability in mind, utilizing asynchronous programming patterns to handle multiple user requests efficiently.

This project demonstrates my ability to create engaging, interactive experiences within the Discord platform. The bot includes features such as a dynamic economy system, inventory management, and a skill tree that allows players to specialize their farming approach. The codebase is structured using object-oriented principles, making it maintainable and extensible for future updates. The bot also includes a shop system, leaderboards, and various interactive commands that encourage community engagement and competition.`,
    technologies: ['Python', 'Discord API', 'AWS', 'Asynchronous Programming', 'Object-Oriented Design'],
    githubLink: 'https://github.com/NishTheFish-dev/The-Farmer',
    demoLink: '',
    images: [
      { src: '/assets/discordbot1.png', alt: 'Discord Bot Main Interface' },
      { src: '/assets/discordbot2.png', alt: 'Discord Bot Farming Commands' }
    ],
    features: [
      'Core farming system with multiple crop types and real-time growth mechanics',
      'Dynamic economy system with crop selling and a virtual shop for seeds and upgrades',
      'Inventory management system for tracking crops, seeds, and purchased items',
      'Interactive UI with button-based controls and clean embed menus',
      'Skill tree system with four upgradeable skills: Grow Rate, Crop Yield, Roll Luck, and XP per Harvest',
      'Wealth leaderboard to track and compete with other players',
      'Multiple biomes to unlock and farm in, each with unique characteristics',
      'Chance-based mutation system for rare and valuable crop variants',
      'Comprehensive help system and intuitive command structure',
      'Asynchronous task handling for real-time crop growth and event processing'
    ]
  },
  {
    slug: 'helpdesk-system',
    title: 'Educational Helpdesk System',
    description: 'A comprehensive helpdesk application designed for educational institutions, featuring role-based access control, help article management, and secure user authentication.',
    longDescription: `The Educational Helpdesk System is a robust Java application built with JavaFX that provides a complete solution for managing help requests and knowledge base articles in an educational setting. The system implements a multi-tier architecture with a clear separation of concerns using the MVC (Model-View-Controller) pattern. It was developed following Agile methodologies with a focus on security, usability, and maintainability.

Key technical aspects of this project include secure password hashing, role-based access control (supporting Students, Instructors, and Administrators), and a comprehensive help article system with different expertise levels. The application features a responsive JavaFX interface with modern UI components and follows best practices in software engineering, including proper exception handling, logging, and documentation. The system also includes database functionality using H2, with capabilities for data backup and restoration.`,
    technologies: ['Java', 'JavaFX', 'MVC Architecture', 'H2 Database', 'Agile Development', 'Role-Based Access Control'],
    githubLink: 'https://github.com/NishTheFish-dev/CSE360-Group-Tu27',
    demoLink: '',
    images: [],
    features: [
      'Role-based access control with three distinct user types: Students, Instructors, and Administrators',
      'Secure authentication system with password reset functionality and one-time passwords',
      'Comprehensive help article system with different expertise levels (beginner, intermediate, advanced, expert)',
      'Database management with H2 for storing user accounts and help articles',
      'Data encryption for sensitive information and secure password storage',
      'Backup and restore functionality for database management',
      'Responsive JavaFX user interface with intuitive navigation',
      'Admin dashboard for user management and system configuration',
      'Article management system for creating, editing, and organizing help content',
      'Role-appropriate views and functionality for each user type'
    ]
  },
  {
    slug: 'virtual-board-game-concept',
    title: 'Virtual Board Game Concept',
    description: 'Worked on a team designing a board game for elementary and middle school students to connect with over COVID. Developed a project timeline and design specification according to user needs. Received Grand Prize award and recognition letter from AZ Congressman David Schweikert.',
    technologies: ['Game Design', 'Project Management', 'User-Centered Design'],
    githubLink: '#',
    demoLink: '',
    images: [
      { src: '/assets/concept1.jpg', alt: 'Virtual Board Game Concept Design' }
    ],
  },
];

export default projectsData;
