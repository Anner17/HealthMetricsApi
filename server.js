const express = require('express');
const routes = require('./app/presentation/routes');
const setupSwagger = require('./config/swagger');
const db = require('./config/db');

const app = express();
app.use(express.json());

setupSwagger(app);
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
