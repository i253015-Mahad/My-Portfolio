/* data.js: ALL editable content lives here. Edit this file to update the site. */
window.PORTFOLIO = {
  config: {
    name: "Mahad Waqas",
    email: "mahadwaqas28@gmail.com",                     // TBD (OI-003): add a public email, e.g. "you@example.com"
    year: new Date().getFullYear()
  },

  links: [
    // TBD (OI-001/OI-002): confirm both URLs before deploying.
    { platform: "GitHub",   label: "View GitHub profile",   url: "https://github.com/i253015-Mahad" },
    { platform: "LinkedIn", label: "View LinkedIn profile", url: "https://www.linkedin.com/in/mahad-waqas-664280319" }
  ],

  profile: {
    role: "BS Software Engineering Student at FAST-NUCES",
    intro: "I build software to learn how things work, from C++ programs and games to a Flutter app.",
    footerSub: "Software Engineering Student • FAST-NUCES",
    
    about: [
      "I'm a Software Engineering student at FAST-NUCES Islamabad. I enjoy building software projects and turning coursework into things that actually work.",
      "I'm currently a Lab Demonstrator at FAST-NUCES, which keeps my fundamentals sharp and gives me the opportunity to work closely with other students. I'm looking to gain practical experience through internships, collaborative projects, and building software that solves real problems."
    ],
    now: [
      { label: "Studying",  value: "BS Software Engineering, FAST-NUCES Islamabad" },
      { label: "Working as", value: "Lab Demonstrator, FAST-NUCES" },
      { label: "Learning",  value: "Dart/Flutter and web development" }
    ]
  },

  skills: [
    { group: "Working knowledge", note: "Used in university or personal projects.",
      items: [
        { name: "C++" }, { name: "Git and GitHub" }, { name: "Figma" }, { name: "HTML" }, { name: "CSS" }
      ] },
    { group: "Still learning", note: "In progress. Not claiming proficiency yet.",
      items: [
        { name: "Dart and Flutter", learning: true },
        { name: "JavaScript", learning: true }
      ] },
    { group: "Academic topics", note: "Covered through coursework.",
      items: [
        { name: "Object-oriented programming" }, { name: "Digital logic design" }, { name: "Discrete structures" }
      ] }
  ],

  // Add a project by copying one object. Only "id", "title", "category", "summary" are required.
  // Optional: problem, features[], technologies[], contribution, images[], videoUrl, githubUrl, demoUrl
  // featured: true shows a "Featured" tag. status: "pending" shows a "Details coming soon" tag.
  projects: [
    { id: "snow-bros", title: "Snow Bros", category: "Game Development", featured: true, status: "completed", 
      features: ["Player movement", "Enemy mechanics", "Custom visuals", "Collision detection", "Interactive gameplay", "Level-based gameplay"],
      summary: "A 2D game-development project developed as a two-member team, focused on implementing core gameplay mechanics, interactive elements, and a complete playable experience.",
      contribution: "Worked on the development of the project, designed and implemented the game's visual elements, and edited the final demo video. My teammate, Usman Laghari, developed the player and enemy mechanics.",
      technologies: ["C++", "SFML"], images: [
        {src: "assets/images/snow-bros/1.png", alt: "Snow Bros Starting Screen" },
        {src: "assets/images/snow-bros/2.png", alt: "Snow Bros Main Menu" }
      ], videoUrl: "assets/videos/Snow-Bros.mp4", githubUrl: "https://github.com/i253015-Mahad/University-Projects/tree/main/2nd-Sem/OOP" },

    { id: "dld-lab-system", title: "Smart University Lab Resource Management System", category: "Academic", status: "completed",
      summary: "A digital logic-based university lab resource management system designed to manage and prioritize resource requests using counters, multiplexing, priority encoding, and sequential logic.", 
      contribution: "Designed and implemented the core digital logic of the system, including the rotating counter, 4×1 multiplexing, 4-to-2 priority encoder, and gated SR latch. Worked on the circuit integration and testing in Proteus, and contributed to the final project demonstration.",
      features: ["Rotating resource selection", "Multiplexer-based routing", "Priority-based emergency override", "Sequential logic control", "Proteus circuit simulation"],
      images: [
        {src: "assets/images/dld-lab/1.png", alt: "Proteus circuit" }],
        videoUrl: "assets/videos/dld-lab-project.mp4",
      technologies: ["Proteus 8"], githubUrl: "https://github.com/i253015-Mahad/University-Projects/tree/main/2nd-Sem/DLD" },

    { id: "iict", title: "MEHNAT", category: "Web Development", status: "completed",
      summary: "A web-based service platform developed as a first-semester IICT project, featuring equipment shopping, worker hiring, user authentication, and informational pages through a multi-page website.", 
      contribution:"Worked on the Home, Login, Signup, Give Feedback, and About pages, contributing to their design, layout, and functionality while helping maintain a consistent user experience across the website.",
      features: ["User login and signup", "Multi-page website navigation", "Service information", "Hardware shop", "Worker search", "User feedback", "Responsive page layouts"],
      technologies: ["Html", "CSS"], images: [
        {src: "assets/images/mehnat/1.png", alt: "MEHNAT Home Screen" },
        {src: "assets/images/mehnat/2.png", alt: "MEHNAT Sign-Up Page" },
        {src: "assets/images/mehnat/3.png", alt: "MEHNAT Service Page" },
        {src: "assets/images/mehnat/4.png", alt: "MEHNAT Hardware Shop" }],
        videoUrl: "assets/videos/mehnat.mp4",
      githubUrl: "https://github.com/i253015-Mahad/University-Projects/tree/main/1st-Sem/IICT"},

      { id: "battleship", title: "Battleship", category: "Game Development", status: "completed",
      summary: "A console-based Battleship game developed as a Programming Fundamentals final project, featuring both two-player and player-versus-computer gameplay, ship placement, turn-based attacks, and win detection.",
      contribution: "Designed and implemented the complete game logic, including ship placement, attack validation, hit/miss tracking, player turns, computer gameplay, ship destruction, and win-condition handling.",
      features: ["Two-player gameplay", "Player vs computer mode", "Ship placement", "Turn-based attacks", "Hit and miss tracking", "Attack validation", "Ship destruction detection", "Win condition detection"],
      technologies: ["C++"], images: [
        {src: "assets/images/BattleShip/1.png", alt: "Battleship Home Screen" },
        {src: "assets/images/BattleShip/2.png", alt: "Battleship Game Screen" },
        {src: "assets/images/BattleShip/3.png", alt: "Battleship Ship Placement" },
        {src: "assets/images/BattleShip/4.png", alt: "Battleship Attack Screen" }],
        videoUrl: "assets/videos/BattleShip.mp4",
      githubUrl: "https://github.com/i253015-Mahad/University-Projects/tree/main/1st-Sem/PF"},

      { id: "alrs", title: "ALRS", category: "Academic", status: "completed", 
      summary: "A C++-based propositional logic expression processor developed as a Discrete Structures project, designed to process and evaluate logical expressions using standard logical operators and operator precedence.",
      contribution: "Designed and implemented the core logic for processing propositional expressions, including operator handling, precedence, expression conversion, and logical operations such as NOT, AND, OR, implication, and equivalence.",
       features: ["Propositional logic processing", "Logical expression parsing", "Operator precedence handling", "Truth table generation", "Argument validation", "Expression equivalence checking", "Implication reasoning", "Saved results management"],
       technologies: ["C++"], images: [
        {src: "assets/images/alrs/1.png", alt: "ALRS Home Screen" },
        {src: "assets/images/alrs/2.png", alt: "ALRS Expression Input" }],
        videoUrl: "assets/videos/alrs.mp4",
      githubUrl: "https://github.com/i253015-Mahad/University-Projects/tree/main/1st-Sem/Discrete"},

    { id: "fast-companion", title: "Fast Companion", category: "App Development", featured: false, status: "pending",
      summary: "A Flutter-based student companion application for FAST students, providing quick access to academic information such as class timetables and FLEX, along with notes, tasks, and other productivity features.",
      contribution: "Designed and developed the application in Flutter, implementing core note and task management, local data storage, Firebase integration, and home-screen widget functionality. Also worked on the student-focused features, including timetable access and a direct link to FLEX.",
      features: ["Note management", "Task and checklist support", "Firebase integration", "Local data storage", "Offline Functionality", "Timed checklist notes", "Increment and decrement counters"],
      problem: ["Home-screen widget not fully functional", "No direct editing from widget", "FAST timetable not implemented", "FLEX integration not implemented"],
      technologies: ["Dart", "Flutter"],
      githubUrl: "https://github.com/i253015-Mahad/Fast-Companion" }
  ],
  experience: [
    { role: "Lab Demonstrator (Programming Fundamentals)", organization: "FAST-NUCES", period: "August 2026 - Present",
      description: "Supports students in university labs and evaluate their work." }
  ],

  education: [
    { degree: "BS Software Engineering", institution: "FAST-NUCES Islamabad", period: "August 2025 - Present" },
     { degree: "FSC", institution: "Fazaia Education System School, Islamabad", period: "2023-2025" },
    { degree: "Matriculation", institution: "Garrison Academy Kharian Cantt, Kharian", period: "2021-2023" }
  ]
};
