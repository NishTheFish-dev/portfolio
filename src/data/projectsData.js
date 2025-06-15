const projectsData = [
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
    description: 'A responsive web application that interfaces with the Spotify Web API to provide a custom music streaming experience. Features include playlist management, track search, and playback controls with a modern UI built using React and TypeScript.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Spotify API', 'OAuth'],
    githubLink: 'https://github.com/NishTheFish-dev/custom-spotify-client',
    demoLink: '',
    images: [],
  },
  {
    slug: 'python-bot-application',
    title: 'Python Bot Application',
    description: 'Created a Python bot which handles asynchronous requests from users and delivers appropriate content. Utilized the Discord API for request handling and Amazon AWS for asynchronous hosting.',
    technologies: ['Python', 'Discord API', 'AWS', 'Asynchronous Programming'],
    githubLink: 'https://github.com/NishTheFish-dev/The-Farmer',
    demoLink: '',
    images: [],
  },
  {
    slug: 'helpdesk-system',
    title: 'Helpdesk System',
    description: 'Created a Helpdesk application using Java and JavaFX to create a functional and smooth graphical user experience. Used the MVC (Model, View, Controller) Architecture and followed Agile software development conventions.',
    technologies: ['Java', 'JavaFX', 'MVC Architecture', 'Agile'],
    githubLink: '#',
    demoLink: '',
    images: [],
  },
  {
    slug: 'vr-bowling-game',
    title: 'VR Bowling Game',
    description: 'Created a bowling game that allows users to play a realistic game of bowling using a VR headset. Utilized the Unity game engine and C# to allow for real-time user input and physics simulation.',
    technologies: ['Unity', 'C#', 'VR Development', 'Game Physics'],
    githubLink: '#',
    demoLink: '',
    images: [],
  },
  {
    slug: 'virtual-board-game-concept',
    title: 'Virtual Board Game Concept',
    description: 'Worked on a team designing a board game for elementary and middle school students to connect with over COVID. Developed a project timeline and design specification according to user needs. Received Grand Prize award and recognition letter from AZ Congressman David Schweikert.',
    technologies: ['Game Design', 'Project Management', 'User-Centered Design'],
    githubLink: '#',
    demoLink: '',
    images: [],
  },
];

export default projectsData;
