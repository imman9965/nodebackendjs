const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// basic error handler
app.use((err, req, res, next) => {
  console.error('UNHANDLED ERROR', err);
  res.status(500).json({ message: 'Something went wrong' });
});

module.exports = app;
