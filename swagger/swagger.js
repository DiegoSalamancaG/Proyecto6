const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CRUD api',
            version: '1.0.0',
            description: 'API for basic crud',
            contact: {
                name: 'Diego Salamanca'
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Local server'
                }
            ]
        }
    },
    apis: ['../routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs;