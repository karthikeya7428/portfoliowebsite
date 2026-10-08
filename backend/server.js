require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Message = require('./models/Message');
const Certification = require('./models/Certification');

const app = express();
app.use(helmet());
app.use(cors({ origin: (process.env.CLIENT_ORIGIN || '*').split(',').map(s => s.trim()) }));
app.use(express.json({ limit: '10kb' }));

const contactLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5,
  message: { error: 'Too many messages. Try again in 15 minutes.' } });

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.get('/api/projects', async (_req, res) => {
  try {
    res.json(await Project.find().sort({ order: 1, createdAt: -1 }).lean());
  } catch (err) {
    res.status(500).json({ error: 'Could not load projects.' });
  }
});

app.get('/api/certifications', async (_req, res) => {
  try {
    res.json(await Certification.find().sort({ order: 1, createdAt: -1 }).lean());
  } catch (err) {
    res.status(500).json({ error: 'Could not load certifications.' });
  }
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, message } = req.body || {};
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');
  if (!name || !message || !emailOk) {
    return res.status(400).json({ error: 'Enter your name, a valid email and a message.' });
  }
  try {
    await Message.create({ name, email, message });
    res.status(201).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not send your message. Try again.' });
  }
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`API running on port ${PORT}`)))
  .catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
