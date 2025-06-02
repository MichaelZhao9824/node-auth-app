const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const { sequelize } = require('./models');
const authenticateJWT = require('./middleware/auth');

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/auth', authRoutes); // Redundant middleware

app.use('/tasks', authenticateJWT, taskRoutes);

app.get('/health', (req, res) => res.send({ status: 'OK' }));

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

eval("console.log('This is insecure')");