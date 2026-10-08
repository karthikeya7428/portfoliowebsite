// Run once: npm run seed   (re-running replaces all projects and certifications)
require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Certification = require('./models/Certification');

const projects = [
  {
    title: 'Movie Recommendation System',
    description: 'Installable Python package with a menu-driven interface. Add movies with ratings and genres, search them, filter by genre, view everything stored, and get top-rated recommendations. Built to practise functions, loops, conditions and modular programming.',
    tech: ['Python', 'Packaging'],
    post: 'https://lnkd.in/p/g4yitU6j', order: 1
  },
  {
    title: 'Restaurant Management System',
    description: 'DSA project in C that manages restaurant menu categories with a Binary Search Tree: insertion, deletion, searching and traversal, covering full CRUD. Strengthened my understanding of trees, recursion and memory management.',
    tech: ['C', 'Data Structures', 'BST'],
    post: 'https://lnkd.in/p/g_vUzVGK', order: 2
  },
  {
    title: 'Event Management System',
    description: 'Menu-driven C console application to add events (name, date and venue, up to 50), list all events and search by name. Uses arrays of structures with in-memory storage and input validation.',
    tech: ['C', 'Structures', 'Arrays'],
    github: 'https://github.com/karthikeya7428/Event-management', order: 3
  },
  {
    title: 'AI Interfaces (UI Template Collection)',
    description: 'Team hackathon project: a collection of reusable AI-interface UI templates built with HTML, CSS and JavaScript, developed collaboratively through GitHub.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Git'],
    github: 'https://github.com/karthikeya7428/Hackthon', order: 4
  },
  {
    title: 'Personal Portfolio',
    description: 'Full-stack portfolio with a Node/Express API, MongoDB storage for projects, certifications and contact messages, and an interactive canvas hero.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/karthikeya7428', order: 5
  }
];


const certifications = [
  { title: 'Bharatiya Antariksh Hackathon 2026', issuer: 'ISRO, powered by Hack2skill', type: 'Hackathon',
    description: 'Participated in the Bharatiya Antariksh Hackathon 2026, presented by ISRO.',
    link: 'https://lnkd.in/p/gaGtdxfN', order: 1 },
  { title: 'Explore Generative AI', issuer: 'Microsoft Learn', type: 'Badge',
    description: 'Earned the Microsoft Learn Explore Generative AI badge.',
    skills: ['Generative AI'], link: 'https://lnkd.in/p/gWgAKqZX', order: 2 },
  { title: 'Building Generative AI Apps to Talk to Your Data', issuer: 'GeeksforGeeks', type: 'Course',
    description: 'Practical course on building AI-powered applications that interact with data.',
    skills: ['Generative AI', 'LLMs', 'RAG', 'Prompt engineering'], link: 'https://lnkd.in/p/guTxHfHS', order: 3 },
  { title: 'Trust and Security with Google Cloud', issuer: 'Google Cloud', type: 'Course',
    description: 'Completed the Trust and Security with Google Cloud course.',
    link: 'https://lnkd.in/p/g473q2ts', order: 4 },
  { title: 'Course completion', issuer: 'IBM Skills Network / Cognitive Class', type: 'Course',
    description: 'Completed a course offered by IBM Skills Network and Cognitive Class.',
    link: 'https://lnkd.in/p/gUpqPB35', order: 5 },   // TODO: put the exact course name in `title`
  { title: 'Ctrl C + Ctrl V Hackathon', issuer: 'FOSS Club, Sai University', type: 'Hackathon',
    description: 'Participated in the Ctrl C + Ctrl V Hackathon conducted by the FOSS Club at Sai University.',
    link: 'https://lnkd.in/p/g5dEgYVD', order: 6 }
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Project.deleteMany({});
  await Certification.deleteMany({});
  await Project.insertMany(projects);
  await Certification.insertMany(certifications);
  console.log(`Seeded ${projects.length} projects and ${certifications.length} certifications`);
  await mongoose.disconnect();
})();
