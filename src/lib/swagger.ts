// Configuración de swagger-jsdoc.
// Lee los comentarios @swagger de los Route Handlers y genera la spec OpenAPI.
// Se importa desde el Route Handler GET /api/v1/docs.

import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title:       process.env.APP_NAME        ?? 'Next.js API',
      description: process.env.APP_DESCRIPTION ?? 'API documentation',
      version:     process.env.APP_VERSION     ?? '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type:         'http',
          scheme:       'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // swagger-jsdoc lee los comentarios JSDoc de los route handlers
  apis: ['./app/api/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);