const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Health Metrics API',
        version: '1.0.0',
        description: 'API for managing user registration, authentication, and health metrics',
    },
    servers: [
        {
        url: 'http://localhost:3000/api',
        description: 'Development server',
        },
    ],
};

// Options for the swagger docs
const options = {
    swaggerDefinition,
    apis: ['./app/presentation/routes.js'], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
