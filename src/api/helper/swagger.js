// Swagger configuration
export const options = {
    swaggerDefinition: {
        openapi: '3.0.1',
        info: {
            title: 'Treatment Api',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/api/routes/*.js'],
};
